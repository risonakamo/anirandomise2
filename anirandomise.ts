import {retrieveShows} from "./lib/show-resolvers";
import {pickShow} from "./lib/randomisation";
import {fullPrint} from "./lib/output";
import {executeShow} from "./lib/execution";

async function main()
{
    const _vidsPath:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\vids";
    const _deletePath:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\delete";

    const _logfile:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\randomise.log";

    anirandomise(_vidsPath,_deletePath,_logfile);
}

async function anirandomise(vidsPath:string,deletePath:string,logfile:string):Promise<void>
{
    var shows:ShowsDict=retrieveShows(vidsPath);
    var pick:Show=await pickShow(shows);

    fullPrint(shows,pick);
    executeShow(pick);
}

main();

export const anirandomiseTest={
    anirandomise
};