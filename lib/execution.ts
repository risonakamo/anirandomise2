import execa from "execa";

/** launch the show */
export async function executeShow(show:Show):Promise<execa.ExecaReturnValue<string>>
{
    return execa(show.topShow.fullPath);
}