import _ from "lodash";
import textTable from "text-table";
import ck from "chalk";

import {pickShow} from "./randomisation";
import {ansiLength} from "./output";
import {retrieveShows} from "./show-resolvers";
import {getPreviousSelection} from "./data-service";

/** perform rng check on target directory with certain number of iterations. */
export async function rngCheckWrapFull(vidspath:string,iterations:number):Promise<void>
{
    var shows:ShowsDict=await retrieveShows(vidspath);
    var lastShow:string=getPreviousSelection() || "<none>";

    return rngCheck(shows,lastShow,iterations);
}

/** perform rng check using provided shows and the last show. */
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

    var showPickStatsTableRows:(string|number)[][]=_.map(showPickStats,
    (x:RngCheckShowStats,i:number,a:RngCheckShowStats[]):(string|number)[]=>{
        var name:string=x.name;

        if (i<=2)
        {
            name=ck.green(name);
        }

        else if (i>=a.length-3)
        {
            name=ck.red(name);
        }

        return [
            name,
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