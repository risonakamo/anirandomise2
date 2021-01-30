import {statSync,Stats} from "fs";
import ck from "chalk";

/** confirm paths exist and are the correct type */
export function confirmPathsConfig(config:AnirandomiseConfig):boolean
{
    if (!(config.vidsPath && config.deletePath && config.logfilePath))
    {
        console.log("a config path was missing");
        return false;
    }

    try
    {
        var vidsStat:Stats=statSync(config.vidsPath);
        var deleteStat:Stats=statSync(config.deletePath);
    }

    catch (err)
    {
        console.log(ck.red("vids path or delete path did not exist"));
        return false;
    }

    if (!vidsStat.isDirectory() || !deleteStat.isDirectory())
    {
        console.log(ck.red("vids or delete path was not a directory"));
        return false;
    }

    try
    {
        var logfileStat:Stats=statSync(config.logfilePath);
    }

    catch
    {
        return true;
    }

    if (!logfileStat.isFile())
    {
        console.log(ck.red("log file was not a directory"));
        return false;
    }

    return true;
}