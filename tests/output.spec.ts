import {assert} from "chai";

import {retrieveShows} from "../lib/show-resolvers";
import {pickShow} from "../lib/randomisation";

import {outputTests,printShowList,printShowListStats,printChoice} from "../lib/output";
const {calcUniqueCounts,calcItemCounts}=outputTests;

describe("output tests",()=>{
    const vidsPath="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\vids";

    describe("print choice tests",async ()=>{
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

    describe("print show stats",()=>{
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
            var res:ShowCounts=calcItemCounts(shows);
            console.log("item counts",res);
            assert.isObject(res);
        });
    });

    describe("print show list",()=>{
        it("should print out the list of shortnames in alphabetical order",async ()=>{
            var shows:ShowsDict=retrieveShows(vidsPath);
            var pick:Show=await pickShow(shows);
            printShowList(shows,pick);
        });
    });

    describe("all prints test",()=>{
        it("should print out correct and consistent details",async ()=>{
            await allPrintTest(vidsPath);
        });

        it("should print out correct and consistent details 2",async ()=>{
            await allPrintTest(vidsPath);
        });

        it("should print out correct and consistent details 3",async ()=>{
            await allPrintTest(vidsPath);
        });
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

/** test all 3 print functions */
async function allPrintTest(vidsPath:string)
{
    var shows:ShowsDict=retrieveShows(vidsPath);
    var pick:Show=await pickShow(shows);

    printShowListStats(shows,pick);
    console.log()

    printShowList(shows,pick);
    console.log();

    printChoice(pick);
}