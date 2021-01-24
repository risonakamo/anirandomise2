import {retrieveShows} from "../lib/show-resolvers";
import {pickShow} from "../lib/randomisation";

import {outputTests} from "../lib/output";
const {printChoice}=outputTests;

describe.only("output tests",async ()=>{
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
});

/** test print choice */
async function printChoiceTest(vidsPath:string):Promise<void>
{
    var shows:ShowsDict=retrieveShows(vidsPath);
    var picked:Show=await pickShow(shows);
    printChoice(picked);
}