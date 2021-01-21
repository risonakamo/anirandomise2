import {retrieveShows} from "./lib/show-resolvers";
import {addShort,dataServiceTest} from "./lib/data-service";
import {cspSample,testRandom} from "./lib/randomisation";

const _vidsPath:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\vids";
const _deletePath:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\delete";

const _logfilePath:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone";
const _logfileName:string="randomise.log";

async function main()
{
    // var shows:ShowsDict=retrieveShows(_vidsPath);
    // testRandom(Object.values(shows),10000);
    dataServiceTest();
}

main();