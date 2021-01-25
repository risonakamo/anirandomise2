import ck from "chalk";
import _ from "lodash";
import stripAnsi from "strip-ansi";
import textTable from "text-table";

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
    var itemCounts:ShowCounts=calcItemCounts(shows);

    var isLastShow:boolean=choice.items.length==1;
    var isShort:boolean=choice.isShort;

    var uniqueCountsAfter:ShowCounts={...uniqueCounts};
    var itemCountsAfter:ShowCounts={...itemCounts};

    // if the show picked is the last show, affects the unique counts
    if (isLastShow)
    {
        // total number of uniques always decreases
        uniqueCountsAfter.total--;

        // decrease the number of uniques corresponding to the type of the picked show
        if (isShort)
        {
            uniqueCountsAfter.shorts--;
        }

        else
        {
            uniqueCountsAfter.shows--;
        }
    }

    // the item counts always decreases
    itemCountsAfter.total--;

    // decrease the corresponding item count
    if (isShort)
    {
        itemCountsAfter.shorts--;
    }

    else
    {
        itemCountsAfter.shows--;
    }

    console.log(textTable([
        ["",ck.green("total"),ck.greenBright("shows"),ck.magenta("shorts")],
        [ck.blue("names"),"8→7","6→5","2"],
        [ck.cyan("items"),"11→10","7→6","4"]
    ],{
        stringLength:ansiLength
    }));
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

/** return length of string with colours */
function ansiLength(input:string):number
{
    return stripAnsi(input).length;
}

export const outputTests={
    printChoice,
    printShowListStats,
    calcUniqueCounts,
    calcItemCounts
};