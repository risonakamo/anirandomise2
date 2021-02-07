import {program} from "commander";
import ck from "chalk";

/** get user arguments from cli */
export function getArgs():AnirandomiseAction
{
    if (process.argv.length==2)
    {
        return {
            action:"randomise"
        };
    }

    var action:AnirandomiseAction={
        action:"unset"
    };

    program
        .usage("anirandomise3")
        .version("3.0.1");

    program
        .command("addshort <shortname>")
        .description("register a shortname as a short")
        .action((shortname:string)=>{
            action={
                action:"addshort",
                shortName:shortname
            } as AddShortAction;
        });

    var setCommand:Command=program
        .command("register")
        .description("register required paths");

    setCommand
        .command("vids <vidspath>")
        .description(`register the path to the vids folder. target path should be a ${ck.yellow("folder")}`)
        .action((vidspath:string)=>{
            action={
                action:"register",
                type:"vids",
                path:vidspath
            } as RegisterAction;
        });

    setCommand
        .command("delete <deletepath>")
        .description(`register the path to the delete folder. target path should be a ${ck.yellow("folder")}`)
        .action((deletepath:string)=>{
            action={
                action:"register",
                type:"delete",
                path:deletepath
            } as RegisterAction;
        });

    setCommand
        .command("logfile <logfile>")
        .description(`register the path to logfile. target path should be a ${ck.yellow("filename")}`)
        .action((logfile:string)=>{
            action={
                action:"register",
                type:"logfile",
                path:logfile
            } as RegisterAction;
        });

    program
        .command("randomise")
        .description("perform randomisation action")
        .action(()=>{
            action={
                action:"randomise"
            };
        });

    program
        .command("check")
        .description("perform check")
        .action(()=>{
            action={
                action:"check"
            };
        });

    program
        .command("rngtest <iterations>")
        .description("run rng test")
        .action((iterations:string)=>{
            var parsedIterations:number=parseInt(iterations);
            if (!parsedIterations)
            {
                console.log(ck.red("failed to parse iterations"));
                return;
            }

            action={
                action:"rngtest",
                iterations:parsedIterations
            } as TestRngAction;
        });

    program.parse(process.argv);
    return action;
}