import {assert,use as chaiUse} from "chai";
import chaiPromise from "chai-as-promised";

import {retrieveShows} from "../lib/show-resolvers";
import {pickShow} from "../lib/randomisation";

import {recordShow} from "../lib/records";

chaiUse(chaiPromise);

describe.only("record show tests",()=>{
    const vidsPath:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\vids";
    const logFile:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\randomise.log";
    const badLogFile:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone";

    it(`should record to the log file and set the previous selected field in data.json. should create log file if did
    not exist before.`,async ()=>{
        var shows:ShowsDict=retrieveShows(vidsPath);
        var picked:Show=await pickShow(shows);

        console.log("picked",picked);

        recordShow(picked,logFile);
    });

    it(`should fail because the log file path given is a folder. also should NOT set the previous selected field`,async ()=>{
        var shows:ShowsDict=retrieveShows(vidsPath);
        var picked:Show=await pickShow(shows);

        console.log("picked",picked);

        await assert.isRejected(recordShow(picked,badLogFile));
    });

    it(`same as should fail test, but should NOT fail because this time
    a correct log file is given`,async ()=>{
        var shows:ShowsDict=retrieveShows(vidsPath);
        var picked:Show=await pickShow(shows);

        console.log("picked",picked);

        await assert.isFulfilled(recordShow(picked,logFile));
    });
});