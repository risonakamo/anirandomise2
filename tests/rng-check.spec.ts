import {retrieveShows} from "../lib/show-resolvers";
import {getPreviousSelection} from "../lib/data-service";

import {rngCheck} from "../lib/rng-check";

describe.only("rng check module tests",()=>{
    const vidsPath="C:/Users/ktkm/Desktop/videos/vids";
    const iterations=5000;
    const testcount=3;

    for (var x=0;x<testcount;x++)
    {
        it(`should perform rng check ${x+1}`,async ()=>{
            var shows:ShowsDict=await retrieveShows(vidsPath);
            var previousShow:string=getPreviousSelection() || "<none>";

            await rngCheck(shows,previousShow,iterations);
        });
    }
});