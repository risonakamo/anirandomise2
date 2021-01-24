import ck from "chalk";
import _ from "lodash";

import {resolveShowItems} from "../lib/show-resolvers";

/** print out a selected show. */
function printChoice(show:Show):void
{
    var shortMark:string="";
    if (show.isShort)
    {
        shortMark=ck.magenta("*");
    }

    console.log(`> ${ck.underline.yellow(show.shortname)}${shortMark}`);

    for (var x=0;x<show.items.length;x++)
    {
        var itemFileName:string=show.items[x].filename;

        if (x==0)
        {
            itemFileName=ck.green(itemFileName);
        }

        console.log(`${x+1}. ${itemFileName}`);
    }
}

function printShowListStats(shows:ShowsDict,choice:Show):void
{
    var uniqueCounts:ShowCounts=calcUniqueCounts(shows);

    // console.log(uniqueCounts);
}

/** determine unique ShowCounts for shows. unique counts is the number of
 * unique shortnames appearing */
function calcUniqueCounts(shows:ShowsDict):ShowCounts
{
    var showList:Show[]=Object.values(shows);

    var uniqueCounts:ShowCounts={
        total:showList.length,
        shows:0,
        shorts:0
    };

    uniqueCounts.shorts=_.sumBy(showList,(x:Show)=>{
        return x.isShort?1:0;
    });

    uniqueCounts.shows=uniqueCounts.total-uniqueCounts.shorts;

    return uniqueCounts;
}

/** determine ShowCounts for show items. show items includes all seperate files */
function calcItemCounts(shows:ShowsDict):ShowCounts
{
    var showItems:ShowItem[]=resolveShowItems(shows);

    var itemCounts:ShowCounts={
        total:showItems.length,
        shows:0,
        shorts:0
    };

    itemCounts.shorts=_.sumBy(showItems,(x:ShowItem)=>{
        return x.isShort?1:0;
    });

    itemCounts.shows=itemCounts.total-itemCounts.shorts;

    return itemCounts;
}

export const outputTests={
    printChoice,
    printShowListStats,
    calcUniqueCounts,
    calcItemCounts
};