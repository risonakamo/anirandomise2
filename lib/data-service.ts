import {readFileSync,writeFile} from "jsonfile";
import {join} from "path";
import _ from "lodash";
import ck from "chalk";
import normalise from "normalize-path";

const _dataPath:string=join(__dirname,"../../data/data.json");

/** add a short to database */
export async function addShort(name:string):Promise<void>
{
    console.log("adding short",ck.magenta(name));
    var data:AnirandomiseData=getData();
    data.shorts=_.uniq([...data.shorts,name]);
    return writeData(data);
}

/** set the previous selection */
export async function setPreviousSelection(selection:string):Promise<void>
{
    var data:AnirandomiseData=getData();
    data.previousSelection=selection;
    return writeData(data);
}

/** set vids path */
export async function setVidsPath(vidDir:string):Promise<void>
{
    console.log("setting vids dir to",vidDir);
    var data:AnirandomiseData=getData();
    data.config.vidsPath=normalise(vidDir);
    return writeData(data);
}

/** set delete path */
export async function setDeletePath(deletePath:string):Promise<void>
{
    console.log("setting delete dir to",deletePath);
    var data:AnirandomiseData=getData();
    data.config.deletePath=normalise(deletePath);
    return writeData(data);
}

/** set log file path */
export async function setLogFilePath(logfile:string):Promise<void>
{
    console.log("setting log file path to",logfile);
    var data:AnirandomiseData=getData();
    data.config.logfilePath=normalise(logfile);
    return writeData(data);
}

/** get the shorts as a set */
export function getShorts():Set<string>
{
    return new Set(getData().shorts);
}

/** retrieve last selection from saved data */
export function getPreviousSelection():string|null
{
    return getData().previousSelection;
}

/** get paths. returns null if any of the paths are null */
export function getPathsConfig():AnirandomiseConfig|null
{
    var config:AnirandomiseConfig=getData().config;

    if (!config.logfilePath || !config.vidsPath || !config.deletePath)
    {
        return null;
    }

    return config;
}

/** get anirandomise persisted data from json file. */
function getData():AnirandomiseData
{
    try
    {
        return readFileSync(_dataPath);
    }

    catch (err)
    {
        console.log(ck.red("data read error"));
    }

    return {
        shorts:[],
        previousSelection:null,
        config:{
            vidsPath:null,
            deletePath:null,
            logfilePath:null
        }
    };
}

/** save new data object */
async function writeData(data:AnirandomiseData):Promise<void>
{
    return writeFile(_dataPath,data,{
        spaces:4
    });
}

export async function dataServiceTest()
{
    await addShort("ada");
    await setPreviousSelection("asdasd");
    console.log(getData());
}