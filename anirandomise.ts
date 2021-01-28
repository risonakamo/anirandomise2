import prompts from "prompts";

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

export const anirandomiseTest={
    anirandomise
};