import prependFile from "prepend-file";
import {statSync,Stats} from "fs";
import {DateTime} from "luxon";
import ck from "chalk";

import {setPreviousSelection} from "../lib/data-service";

/** record a show to the target log file */
export async function recordShow(show:Show,logFile:string):Promise<void>
{
    try
    {
        var logfileStat:Stats=statSync(logFile);

        // if it exists and is a directory, problem
        if (logfileStat && !logfileStat.isFile())
        {
            console.log(ck.red(`log file ${logFile} was not a file`));
            throw "LOGERR";
        }
    }

    catch (err)
    {
        // if it doesnt exist, dont care, it will be created.
        if (err.code=="ENOENT")
        {
            console.log(ck.blue(`creating logfile at ${ck.yellow(logFile)}`));
        }

        else
        {
            throw err;
        }
    }

    setPreviousSelection(show.shortname);
    return prependFile(logFile,`${customTimeStamp()} ${show.topShow.filename}\r\n`);
}

/** get timestamp string for current time*/
function customTimeStamp():string
{
    return DateTime.local().toFormat("yyyy-LL-dd HH:mm:ss");
}