import {assert} from "chai";

import {retrieveShows} from "../lib/show-resolvers";
import {pickShow} from "../lib/randomisation";

import {recordShow} from "../lib/records";

describe.only("record show tests",()=>{
    const vidsPath:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\vids";
    const logFile:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\randomise.log";
    const badLogFile:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone";

    it("should record to the log file",async ()=>{
        var shows:ShowsDict=retrieveShows(vidsPath);
        var picked:Show=await pickShow(shows);

        console.log("picked",picked);

        recordShow(picked,logFile);
    });

    it("should fail because the log file is a folder",async ()=>{
        var shows:ShowsDict=retrieveShows(vidsPath);
        var picked:Show=await pickShow(shows);

        assert.throws(()=>{
            recordShow(picked,badLogFile);
        });
    });
});