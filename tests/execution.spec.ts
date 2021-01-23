import {retrieveShows} from "../lib/show-resolvers";
import {pickShow} from "../lib/randomisation";

import {executeShow} from "../lib/execution";

const _vidsPath:string="C:\\Users\\ktkm\\Desktop\\anirandomise3\\testzone\\vids";

describe.only("show execution",()=>{
    it("should launch a show",async ()=>{
        var shows:ShowsDict=retrieveShows(_vidsPath);
        await executeShow(await pickShow(shows));
    });
});