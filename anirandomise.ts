import {retrieveShows} from "./lib/show-resolvers";
import {addShort} from "./lib/data-service";
import {cspSample} from "./lib/randomisation";

const _vidsPath:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\vids";
const _deletePath:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\delete";

const _logfilePath:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone";
const _logfileName:string="randomise.log";

async function main()
{
    var shows:ShowsDict=retrieveShows(_vidsPath);
    console.log(await cspSample(Object.values(shows)));
}

main();