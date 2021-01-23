import randomNumber from "random-number-csprng";
import _ from "lodash";

import {getPreviousSelection} from "./data-service";

/** pick a show from a shows dict. has a reduced chance to pick the show set as the previous
 * selection, but does not set the previous selection. */
export async function pickShow(shows:ShowsDict):Promise<Show>
{
    var showNames:Set<string>=new Set(Object.keys(shows));
    var lastShow:string|null=getPreviousSelection();

    // if there was actually a previous show, the previous show is one of the shows
    // that we can pick from, and the duplicate chance returns true, then we are returning
    // the duplicate show.
    if (lastShow && showNames.has(lastShow) && await duplicateChance(showNames.size))
    {
        return shows[lastShow];
    }

    var showsWithoutLastShow:ShowsDict=_.omit(shows,lastShow!);
    return cspSample(Object.values(showsWithoutLastShow));
}

/** return a random value from a given array using csrng */
async function cspSample<T>(array:T[]):Promise<T>
{
    if (array.length==1)
    {
        return array[0];
    }

    return array[await randomNumber(0,array.length-1)];
}

/** given a number of items, return if duplicate should be chosen using formula */
async function duplicateChance(items:number,reductionChance:number=.5,maxChance:number=.25):Promise<boolean>
{
    if (items==1)
    {
        return true;
    }

    var successChance:number=Math.min((1/items)*reductionChance,maxChance);
    var randomVal:number=(await randomNumber(0,1000))/1000;

    return randomVal<successChance;
}

export const randomisationTestable={
    duplicateChance,
    cspSample
};