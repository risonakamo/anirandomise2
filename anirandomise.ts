import ck from "chalk";
import _ from "lodash";

import {retrieveShows} from "./lib/show-resolvers";
import {pickShow} from "./lib/randomisation";
import {fullPrint} from "./lib/output";
import {executeShow} from "./lib/execution";
import {relocateShow,promptRelocate} from "./lib/relocation";
import {recordShow} from "./lib/records";
import {getArgs} from "./lib/cli";
import {setVidsPath,setDeletePath,setLogFilePath,addShort,getPathsConfig} from "./lib/data-service";
import {confirmPathsConfig} from "./lib/verification";
import {rngCheckWrapFull} from "./lib/rng-check";

async function main()
{
    var action:AnirandomiseAction=getArgs();

    if (action.action=="register")
    {
        var registerAction:RegisterAction=action as RegisterAction;

        switch (registerAction.type)
        {
            case "vids":
            setVidsPath(registerAction.path);
            break;

            case "delete":
            setDeletePath(registerAction.path);
            break;

            case "logfile":
            setLogFilePath(registerAction.path);
            break;
        }
    }

    else if (action.action=="addshort")
    {
        var addShortAction:AddShortAction=action as AddShortAction;

        addShort(addShortAction.shortName);
    }

    else
    {
        var config:AnirandomiseConfig|null=getPathsConfig();

        if (!config || !confirmPathsConfig(config))
        {
            console.log(ck.red("paths not configured or are invalid! use register command to register required paths"));
            return;
        }

        if (action.action=="randomise" || action.action=="check")
        {
            var check:boolean=action.action=="check"?true:false;

            anirandomise(config.vidsPath!,config.deletePath!,config.logfilePath!,check);
        }

        else if (action.action=="rngtest")
        {
            var rngCheckAction=action as TestRngAction;
            rngCheckWrapFull(config.vidsPath!,rngCheckAction.iterations);
        }

        else
        {
            console.log(ck.red("invalid action???"));
        }
    }
}

/** perform anirandomise */
async function anirandomise(vidsPath:string,deletePath:string,logfile:string,checkMode:boolean=false):Promise<void>
{
    var shows:ShowsDict=retrieveShows(vidsPath);

    if (_.isEmpty(shows))
    {
        console.log(ck.red("no shows at target directory"));
        return;
    }

    var pick:Show=await pickShow(shows);

    fullPrint(shows,pick);

    if (checkMode)
    {
        return;
    }

    recordShow(pick,logfile);
    executeShow(pick);

    if (await promptRelocate())
    {
        await relocateShow(pick,deletePath);
    }
}

export const anirandomiseTest={
    anirandomise
};

if (require.main)
{
    main();
}