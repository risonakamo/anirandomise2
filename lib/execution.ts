import execa from "execa";

/** launch the show */
export async function executeShow(show:Show)
{
    console.log(show);
    // await execa("cmd",["/c",`"${show.items[0].fullPath}"`]);
}