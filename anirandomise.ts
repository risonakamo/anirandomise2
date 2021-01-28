import {statSync,Stats} from "fs";
import ck from "chalk";

import {retrieveShows} from "./lib/show-resolvers";
import {pickShow} from "./lib/randomisation";
import {fullPrint} from "./lib/output";
import {executeShow} from "./lib/execution";
import {relocateShow,promptRelocate} from "./lib/relocation";
import {recordShow} from "./lib/records";

async function main()
{
    const _vidsPath:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\vids";
    const _deletePath:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\delete";

    const _logfile:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\randomise.log";

    anirandomise(_vidsPath,_deletePath,_logfile);
}

/** perform anirandomise */
async function anirandomise(vidsPath:string,deletePath:string,logfile:string,checkMode:boolean=false):Promise<void>
{
    confirmPaths(vidsPath,deletePath,logfile);

    var shows:ShowsDict=retrieveShows(vidsPath);
    var pick:Show=await pickShow(shows);

    fullPrint(shows,pick);

    if (checkMode)
    {
        return;
    }

    recordShow(pick,logfile);
    executeShow(pick);

    if (await promptRelocate())
    {
        await relocateShow(pick,deletePath);
    }
}

/** confirm paths exist and are the correct type */
function confirmPaths(vidsPath:string,deletePath:string,logfile:string):void
{
    try
    {
        var vidsStat:Stats=statSync(vidsPath);
        var deleteStat:Stats=statSync(deletePath);
        var logfileStat:Stats=statSync(logfile);
    }

    catch (err)
    {
        console.log(ck.red("a file path was bad"));
        throw err;
    }

    if (!logfileStat.isFile() || !vidsStat.isDirectory() || !deleteStat.isDirectory())
    {
        console.log(ck.red("file/directory type error"));
        throw "LOGERR";
    }
}

export const anirandomiseTest={
    anirandomise
};