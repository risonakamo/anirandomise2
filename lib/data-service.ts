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

/** get the shorts as a set */
export function getShorts():Set<string>
{
    return new Set(getData().shorts);
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
        shorts:[]
    };
}

/** save new data object */
async function writeData(data:AnirandomiseData):Promise<void>
{
    return new Promise<void>((resolve)=>{
        writeFile(_dataPath,data,{
            spaces:4
        },()=>{
            resolve();
        });
    });

}

export async function dataServiceTest()
{
    await addShort("ad");
    await addShort("ad3");
    console.log(getData());
}