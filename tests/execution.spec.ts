import {retrieveShows} from "../lib/show-resolvers";
import {pickShow} from "../lib/randomisation";

import {executeShow} from "../lib/execution";

const _vidsPath:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\vids";

describe.only("show execution",()=>{
    it("should launch a show",async function(){
        this.timeout(0);

        var shows:ShowsDict=retrieveShows(_vidsPath);
        var picked:Show=await pickShow(shows);
        console.log(picked);
        await executeShow(picked);
    });
});