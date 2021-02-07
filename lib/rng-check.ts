import _ from "lodash";
import textTable from "text-table";
import ck from "chalk";

import {pickShow} from "./randomisation";
import {ansiLength} from "./output";

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
    console.log("iterations:",iterations);
    console.log();

    // --- CALCULATING STATS TABLE ---
    var showPickStats:RngCheckShowStats[]=_.map(counts,(x:number,i:string):RngCheckShowStats=>{
        return {
            name:i,
            count:x,
            pickrate:(x/iterations)*100
        };
    });

    showPickStats=_.reverse(_.sortBy(showPickStats,(x:RngCheckShowStats)=>{
        return x.count;
    }));

    var showPickStatsTableRows:(string|number)[][]=_.map(showPickStats,(x:RngCheckShowStats):(string|number)[]=>{
        return [
            x.name,
            x.count,
            x.pickrate
        ];
    });

    console.log(textTable([
        [ck.yellow("name"),ck.yellow("pick count"),ck.yellow("pick rate")],
        ...showPickStatsTableRows
    ],{
        stringLength:ansiLength
    }));

    // --- PICK RATE ANALYSIS ---
    var showPickStatsNoLast:RngCheckShowStats[]=_.reject(showPickStats,(x:RngCheckShowStats)=>{
        return x.name==lastshow;
    });

    var pickrates:number[]=_.map(showPickStatsNoLast,(x:RngCheckShowStats)=>{
        return x.pickrate;
    });

    console.log();
    console.log("average pickrate (without last show):",_.sum(pickrates)/pickrates.length);
    console.log("min-max deviation (without last show):",_.max(pickrates)!-_.min(pickrates)!);
}