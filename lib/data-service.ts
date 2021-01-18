import {readFileSync,writeFile} from "jsonfile";
import {join} from "path";
import _ from "lodash";

const _dataPath:string=join(__dirname,"../../data/data.json");

export async function dataServiceTest()
{
    await addShort("ad");
    await addShort("ad3");
    console.log(getData());
}

/** add a short to database */
export async function addShort(name:string):Promise<void>
{
    var data:AnirandomiseData=getData();
    data.shorts=_.uniq([...data.shorts,name]);
    return writeData(data);
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
        console.log("data read error");
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
            console.log("da");
            resolve();
        });
    });

}