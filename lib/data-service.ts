import {readFileSync,writeFile} from "jsonfile";
import {join} from "path";
import _ from "lodash";
import ck from "chalk";

const _dataPath:string=join(__dirname,"../../data/data.json");

/** add a short to database */
export async function addShort(name:string):Promise<void>
{
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
        previousSelection:null
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