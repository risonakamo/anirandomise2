import {assert} from "chai";

import {retrieveShows} from "../lib/show-resolvers";
import {pickShow} from "../lib/randomisation";

import {outputTests} from "../lib/output";
const {printChoice,printShowListStats,calcUniqueCounts,calcItemCounts}=outputTests;

describe("print choice tests",async ()=>{
    const vidsPath="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\vids";

    it("should print out a choice",async ()=>{
        await printChoiceTest(vidsPath);
    });

    it("should print out a choice 2",async ()=>{
        await printChoiceTest(vidsPath);
    });

    it("should print out a choice 3",async ()=>{
        await printChoiceTest(vidsPath);
    });

    it("should print out a choice 4",async ()=>{
        await printChoiceTest(vidsPath);
    });

    it("should print out show list counts",async ()=>{
        var shows:ShowsDict=retrieveShows(vidsPath);
        var picked:Show=await pickShow(shows);
        console.log("picked",picked.shortname);
        printShowListStats(shows,picked);
    });
});

describe.only("print show stats",()=>{
    const vidsPath="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\vids";

    it("should print out show list counts",async ()=>{
        var shows:ShowsDict=retrieveShows(vidsPath);
        var picked:Show=await pickShow(shows);
        console.log("picked",picked.shortname);
        printShowListStats(shows,picked);
    });

    it("should print out unique counts object",()=>{
        var shows:ShowsDict=retrieveShows(vidsPath);
        var res:ShowCounts=calcUniqueCounts(shows);
        console.log("unique counts",res);
        assert.isObject(res);
    });

    it("should print out item counts object",()=>{
        var shows:ShowsDict=retrieveShows(vidsPath);
        calcItemCounts(shows);
    });
});


/** test print choice */
async function printChoiceTest(vidsPath:string):Promise<void>
{
    var picked:Show=await getAShow(vidsPath);
    printChoice(picked);
}

/** get a single random show */
async function getAShow(vidsPath:string):Promise<Show>
{
    var shows:ShowsDict=retrieveShows(vidsPath);
    return pickShow(shows);
}