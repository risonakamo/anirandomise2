import {assert} from "chai";

import {retrieveShows} from "../lib/show-resolvers";
import {pickShow} from "../lib/randomisation";

import {recordShow} from "../lib/records";

describe.only("record show tests",()=>{
    const vidsPath:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\vids";
    const logFile:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\randomise.log";
    const badLogFile:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone";

    it("should record to the log file and set the previous selected field in data.json",async ()=>{
        var shows:ShowsDict=retrieveShows(vidsPath);
        var picked:Show=await pickShow(shows);

        console.log("picked",picked);

        recordShow(picked,logFile);
    });

    it.only(`should fail because the log file is a folder
    and should NOT set the previous selected field`,async ()=>{
        var shows:ShowsDict=retrieveShows(vidsPath);
        var picked:Show=await pickShow(shows);

        console.log("picked",picked);

        assert.throws(()=>{
            try
            {
                recordShow(picked,badLogFile);
            }

            catch (err)
            {
                throw err;
            }
        });
    });

    it.only(`same as should fail test, but should NOT fail because this time
    a correct log file is given`,async ()=>{
        var shows:ShowsDict=retrieveShows(vidsPath);
        var picked:Show=await pickShow(shows);

        console.log("picked",picked);

        assert.doesNotThrow(()=>{
            try
            {
                recordShow(picked,logFile);
            }

            catch (err)
            {
                throw err;
            }
        });
    });
});