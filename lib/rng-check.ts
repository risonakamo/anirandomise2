import _ from "lodash";

import {pickShow} from "../lib/randomisation";

export async function rngCheck(shows:ShowsDict,lastshow:string,iterations:number):Promise<void>
{
    var counts:ShowNameCounts=_.mapValues(shows,()=>{
        return 0;
    });

    for (var x=0;x<iterations;x++)
    {
        var pick:Show=await pickShow(shows);

        counts[pick.shortname]++;
    }

    console.log("last show:",lastshow);
    console.log(counts);
}