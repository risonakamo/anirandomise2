import nm from "normalize-path";
import {readdirSync} from "fs";
import {resolve,extname} from "path";
import _ from "lodash";
import ck from "chalk";
import naturalCompare from "string-natural-compare";

/** create Show objects from shows in a target dir */
export function retrieveShows(target:string):ShowsDict
{
    return groupShowItems(determineShowItems(target));
}

/** generate show items for all shows at the target path. */
function determineShowItems(target:string):ShowItem[]
{
    // all files in the dir
    var files:string[]=readdirSync(nm(target));

    // filtered down to only videos
    files=_.filter(files,(x:string)=>{
        return isValidShow(x);
    });

    return _.map(files,(x:string):ShowItem=>{
        return {
            filename:x,
            fullPath:nm(resolve(x))
        };
    });
}

/** group show items into array of Shows */
function groupShowItems(items:ShowItem[]):ShowsDict
{
    var showItemsDict:GroupedShowItems=_.groupBy(items,(x:ShowItem)=>{
        return simplifyName(x.filename);
    });

    return _.mapValues(showItemsDict,(x:ShowItem[],i:string):Show=>{
        return {
            items:x.sort(compareShowItem),
            shortname:i,
            isShort:false
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
function compareShowItem(a:ShowItem,b:ShowItem):number
{
    return naturalCompare(a.filename,b.filename);
}