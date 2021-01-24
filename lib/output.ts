import ck from "chalk";
import _ from "lodash";

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

// TODO: RE DO THIS COMPLETELY
function printShowListStats(shows:ShowsDict,choice:Show):void
{
    var showList:Show[]=Object.values(shows);

    var numShorts:number=_.sumBy(showList,(x:Show)=>{
        return x.isShort?1:0;
    });

    var numShows:number=showList.length-numShorts;

    var showListLengthAfter:number=numShows;
    var numShortsAfter:number=numShorts;

    if (choice.isShort)
    {
        numShortsAfter--;
    }

    else
    {
        showListLengthAfter--;
    }

    var showLengthAfterString:string;
    var numShortsAfterString:string;

    if (choice.isShort)
    {
        showLengthAfterString=ck.yellow(showListLengthAfter);
        numShortsAfterString=ck.red(numShortsAfter);
    }

    else
    {
        showLengthAfterString=ck.red(showListLengthAfter);
        numShortsAfterString=ck.magentaBright(numShortsAfter);
    }

    console.log([
        `Counts: `,
        `${ck.yellow(showList.length)} (${ck.magentaBright(numShorts)})`,
        ck.grey(` -> `),
        `${showLengthAfterString} (${numShortsAfterString})`
    ].join(""));
}

export const outputTests={
    printChoice,
    printShowListStats
};