import {retrieveShows} from "../lib/show-resolvers";
import {getPreviousSelection} from "../lib/data-service";

import {rngCheck} from "../lib/rng-check";

describe.only("rng check module tests",()=>{
    const vidsPath="C:/Users/ktkm/Desktop/videos/vids";

    it("should perform rng check",async ()=>{
        var shows:ShowsDict=await retrieveShows(vidsPath);
        var previousShow:string=getPreviousSelection() || "<none>";

        rngCheck(shows,previousShow,500);
    });
});