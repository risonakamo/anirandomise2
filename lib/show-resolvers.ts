import nm from "normalize-path";
import {readdirSync} from "fs";
import {resolve,extname,join} from "path";
import _ from "lodash";
import ck from "chalk";
import naturalCompare from "string-natural-compare";

import {getShorts} from "./data-service";

/** create Show objects from shows in a target dir */
export function retrieveShows(target:string):ShowsDict
{
    return groupShowItems(determineShowItems(target));
}

/** convert ShowsDict back to list of ShowItems */
export function resolveShowItems(shows:ShowsDict):ShowItem[]
{
    return _.flatMap(shows,(x:Show)=>{
        return x.items;
    });
}

/** generate show items for all shows at the target path. */
function determineShowItems(target:string):ShowItemSimple[]
{
    // all files in the dir
    var files:string[]=readdirSync(nm(target));

    // filtered down to only videos
    files=_.filter(files,(x:string)=>{
        return isValidShow(x);
    });

    return _.map(files,(x:string):ShowItemSimple=>{
        return {
            filename:x,
            fullPath:nm(resolve(join(target,x)))
        };
    });
}

/** group show items into array of Shows */
function groupShowItems(items:ShowItemSimple[]):ShowsDict
{
    var shorts:Set<string>=getShorts();
    var showItemsDict:GroupedShowItemsSimple=_.groupBy(items,(x:ShowItemSimple)=>{
        return simplifyName(x.filename);
    });

    return _.mapValues(showItemsDict,(x:ShowItemSimple[],i:string):Show=>{
        var isShort:boolean=shorts.has(i);
        var sortedItems:ShowItemSimple[]=x.sort(compareShowItem);
        var upgradedItems:ShowItem[]=upgradeShowItems(sortedItems,isShort);

        return {
            items:upgradedItems,
            topShow:upgradedItems[0],
            shortname:i,
            isShort
        };
    });
}

/** given a filename, determine if the file is a file type we care about
 * (video files) */
function isValidShow(filename:string):boolean
{
    var ext:string=extname(filename);

    return ext==".mkv" || ext==".mp4";
}

/** attempt to simplify a video file name to short form. */
function simplifyName(filename:string):string
{
    var result:string=filename
        .replace(/[\[\(].*?[\]\)]|\.mkv|\.mp4|END|end/g,"")
        .replace(/[^\w]|\d/g,"")
        .toLowerCase();

    if (!result.length)
    {
        console.log(ck.red("NAME SIMPLIFICATION ERROR"));
        return "NAME_ERROR";
    }

    return result;
}

/** sort function for ShowItem names */
function compareShowItem(a:ShowItemSimple,b:ShowItemSimple):number
{
    return naturalCompare(a.filename,b.filename);
}

/** given an array of related ShowItemSimples, upgrade them to ShowItems with the short
 * field set to the given short value */
function upgradeShowItems(showItems:ShowItemSimple[],isShort:boolean):ShowItem[]
{
    return _.map(showItems,(x:ShowItemSimple):ShowItem=>{
        return {
            ...x,
            isShort
        };
    });
}