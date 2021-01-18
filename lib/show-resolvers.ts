import normalise from "normalize-path";
import {readdirSync} from "fs";
import {resolve,extname} from "path";
import _ from "lodash";

/** generate show items for all shows at the target path. */
export function determineShowItems(target:string):ShowItem[]
{
    // all files in the dir
    var files:string[]=readdirSync(normalise(target));

    // filtered down to only videos
    files=_.filter(files,(x:string)=>{
        return isValidShow(x);
    });

    return _.map(files,(x:string):ShowItem=>{
        return {
            filename:x,
            fullPath:resolve(x)
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