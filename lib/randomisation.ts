import randomNumber from "random-number-csprng";
import _ from "lodash";

/** return a random value from a given array using csrng */
export async function cspSample<T>(array:T[]):Promise<T>
{
    if (array.length==1)
    {
        return array[0];
    }

    return array[await randomNumber(0,array.length-1)];
}

/** given a number of items, return if duplicate should be chosen using formula */
async function duplicateChance(items:number,reductionChance:number=.5,maxChance:number=.25):Promise<boolean>
{
    if (items==1)
    {
        return true;
    }

    var successChance:number=Math.min((1/items)*reductionChance,maxChance);
    var randomVal:number=(await randomNumber(0,1000))/1000;

    return randomVal<successChance;
}

/** test cspSample function. give it array of shows to pick from and number of times to perform picks. */
export async function testRandom(shows:Show[],numPicks:number):Promise<void>
{
    var picks:Promise<Show>[]=[];
    for (var x=0;x<numPicks;x++)
    {
        picks.push(cspSample(shows));
    }

    var resolvedPicks:Show[]=await Promise.all(picks);
    var pickCounts:ShowNameCounts=_.countBy(resolvedPicks,(x:Show)=>{
        return x.shortname;
    });

    var percentages:ShowNameCounts=_.mapValues(pickCounts,(x:number)=>{
        return (x/numPicks)*100;
    });

    console.log(percentages);
    console.log("expected average:",(1/shows.length)*100);
}

export async function testRandom2():Promise<void>
{
    console.log(await duplicateChance(4));
}