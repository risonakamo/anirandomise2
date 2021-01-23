import prependFile from "prepend-file";
import {statSync} from "fs";

/** record a show to the target log file */
export function recordShow(show:Show,logFile:string)
{
    if (!statSync(logFile).isFile())
    {
        throw `log file ${logFile} was not a file`;
    }

    prependFile(logFile,`${show.items[0].filename}\n`);
}