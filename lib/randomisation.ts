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