import prependFile from "prepend-file";
import {statSync} from "fs";

import {setPreviousSelection} from "../lib/data-service";

/** record a show to the target log file */
export function recordShow(show:Show,logFile:string):Promise<void>
{
    if (!statSync(logFile).isFile())
    {
        throw `log file ${logFile} was not a file`;
    }

    setPreviousSelection(show.shortname);
    return prependFile(logFile,`${show.topShow.filename}\n`);
}