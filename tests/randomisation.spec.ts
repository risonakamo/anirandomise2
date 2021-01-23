import {assert} from "chai";
import _ from "lodash";

import {retrieveShows} from "../lib/show-resolvers";
import {getPreviousSelection} from "../lib/data-service";

import {randomisationTestable,pickShow} from "../lib/randomisation";

const _vidsPath:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\vids";

describe("duplicate chance",()=>{
    it("should return booleans",async ()=>{
        const {duplicateChance}=randomisationTestable;

        console.log(await duplicateChance(1));
        console.log(await duplicateChance(2));
        console.log(await duplicateChance(4));
        console.log(await duplicateChance(10));
        assert.isBoolean(await duplicateChance(10));
    });
});

describe("csp sample test",()=>{
    it("should select shows at a rate comparable to the expected average",async ()=>{
        var shows:ShowsDict=retrieveShows(_vidsPath);

        await testRandom(Object.values(shows),100);
    });
});

describe("pick show. REQUIRES SHOWS TO BE IN THE TESTZONE/vids",()=>{
    it("should return a show",async ()=>{
        var shows:ShowsDict=retrieveShows(_vidsPath);

        var picked:Show=await pickShow(shows);
        console.log(picked);
        assert.isObject(picked);
    });

    it("should not return the previous selected many times",pickShowTest);
    it("should not return the previous selected many times 2",pickShowTest);
    it("should not return the previous selected many times 3",pickShowTest);
});

/** test cspSample function. give it array of shows to pick from and number of times to perform picks. */
export async function testRandom(shows:Show[],numPicks:number):Promise<void>
{
    const {cspSample}=randomisationTestable;

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

async function pickShowTest():Promise<void>
{
    const iterations:number=100;

    var lastShow:string=getPreviousSelection() || "";
    var shows:ShowsDict=retrieveShows(_vidsPath);

    console.log("last show:",lastShow);

    var gotLastCount:number=0;
    for (var x=0;x<iterations;x++)
    {
        var picked:Show=await pickShow(shows);

        if (picked.shortname==lastShow)
        {
            gotLastCount++;
        }
    }

    var pickRate:number=gotLastCount/iterations;
    var uniformAverage:number=1/Object.keys(shows).length;
    console.log(`picked ${gotLastCount} times out of ${iterations}`);
    console.log("pick rate%",pickRate*100);
    console.log("uniform average%",uniformAverage*100);
    assert.isBelow(pickRate,uniformAverage,"pick rate should below the uniform average");
}