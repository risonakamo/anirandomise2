import ck from "chalk";

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

export const outputTests={
    printChoice
};