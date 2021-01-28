import mv from "move-concurrently";
import {join} from "path";
import retry from "async-retry";
import ck from "chalk";
import prompts from "prompts";

/** relocate a target show to a target location. continuously retries until succeeding. */
export async function relocateShow(show:Show,target:string):Promise<void>
{
    await retry(async (bail)=>{
        try
        {
            await mv(show.topShow.fullPath,join(target,show.topShow.filename));
        }

        catch (err)
        {
            if (err.code=="ENOENT")
            {
                console.log(ck.red("target location does not exist"));
                bail(err);
                return;
            }

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

/** prompt user for if should perform relocation or not. */
export async function promptRelocate():Promise<boolean>
{
    var relocatePrompt:RelocatePromptAnswers=await prompts({
        type:"confirm",
        name:"relocate",
        message:"relocate?",
        initial:true
    });

    return relocatePrompt.relocate;
}