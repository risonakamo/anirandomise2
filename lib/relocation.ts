import mv from "move-concurrently";
import {join} from "path";

/** relocate a target show to a target location */
export async function relocateShow(show:Show,target:string):Promise<void>
{
    return mv(show.topShow.fullPath,join(target,show.topShow.filename));
}