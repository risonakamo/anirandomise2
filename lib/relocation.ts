import mv from "move-concurrently";
import {join} from "path";
import retry from "async-retry";
import ck from "chalk";

/** relocate a target show to a target location. continuously retries until succeeding. */
export async function relocateShow(show:Show,target:string):Promise<void>
{
    await retry(async ()=>{
        try
        {
            await mv(show.topShow.fullPath,join(target,show.topShow.filename));
        }

        catch (err)
        {
            console.log(ck.red("failed to move file"));
            throw err;
        }
    },{
        retries:100,
        maxTimeout:3000,
        factor:1.2
    });

    console.log(ck.green("moved file"));
}