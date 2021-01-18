import {determineShowItems} from "./lib/show-resolvers";

const _vidsPath:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\vids";
const _deletePath:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\delete";

const _logfilePath:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone";
const _logfileName:string="randomise.log";

function main()
{
    console.log(determineShowItems(_vidsPath));
}

main();