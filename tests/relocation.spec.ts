import {assert,use as chaiUse} from "chai";
import chaiPromise from "chai-as-promised";

import {retrieveShows} from "../lib/show-resolvers";
import {pickShow} from "../lib/randomisation";

import {relocateShow} from "../lib/relocation";

chaiUse(chaiPromise);

describe.only("show relocation",()=>{
    const vidsPath:string="C:/Users/ktkm/Desktop/anirandomise3/testzone/vids";
    const deletePath:string="C:/Users/ktkm/Desktop/anirandomise3/testzone/delete";
    const badDeletePath:string="C:/Users/ktkm/Desktop/anirandomise3/testzone/delete2";

    it("should relocate a random show",async ()=>{
        var shows:ShowsDict=retrieveShows(vidsPath);
        var pick:Show=await pickShow(shows);

        console.log("moving",pick.topShow.filename);
        relocateShow(pick,deletePath);
    });

    it("should fail to relocate a show",async ()=>{
        var shows:ShowsDict=retrieveShows(vidsPath);
        var pick:Show=await pickShow(shows);

        console.log("failing to moving",pick.topShow.filename);
        await assert.isRejected(relocateShow(pick,badDeletePath));
    });
});