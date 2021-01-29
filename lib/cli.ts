import {program} from "commander";

export function getArgs()
{
    program
        .command("add-short <shortname>")
        .action((shortname:string)=>{
            console.log("adding short",shortname);
        });

    var setCommand:Command=program.command("set-path");

    setCommand
        .command("vids <vidspath>")
        .action((vidspath:string)=>{
            console.log("setting vids path");
        });

    setCommand
        .command("delete <deletepath>")
        .action((deletepath:string)=>{
            console.log("setting delete path");
        });

    setCommand
        .command("logfile <logfile>")
        .action((logfile:string)=>{
            console.log("setting logfile path");
        });

    program.parse(process.argv);
}