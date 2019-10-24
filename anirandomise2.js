const _=require("lodash");
const yaml=require("js-yaml");
const fs=require("fs-extra");
const path=require("path");
const child_process=require("child_process");
const chalk=require("chalk");
const moment=require("moment");
const commander=require("commander");
const keypress=require("keypress");

function main()
{
    var args=handleArgs();
    var config=getConfig();

    var dirItems=fs.readdirSync(config.itemspath,{withFileTypes:true});
    dirItems=_.filter(dirItems,(x)=>{
        return x.isFile();
    });

    var vidset=convertVidSet(dirItems);

    printVidSet(vidset);
    var selection=selectVid(vidset,config.itemspath,args.check);

    if (config.log && !args.check)
    {
        logToLog(path.normalize(`${config.logfilepath}/${config.logfilename}`),selection);
    }

    moveVid();
}

//given a Type Dirent array from readdir, convert it into a Type VidSet, a dict:
function convertVidSet(files)
{
    var smallname;
    return _.reduce(files,(r,x)=>{
        smallname=simplifyName(x.name);

        if (!smallname.length)
        {
            return r;
        }

        if (!r[smallname])
        {
            r[smallname]=[];
        }

        r[smallname].push(x.name);

        return r;
    },{});
}

//given a string name, return the simplified version of it, or nothing if it
//is not the correct file type
function simplifyName(name)
{
    var extension=path.extname(name);
    if (!(extension==".mkv" || extension==".mp4"))
    {
        return "";
    }

    return name.replace(/\[.*?\]|\.mkv|\.mp4/g,"").replace(/[^\w]|\d/g,"").toLowerCase();
}

//given the config, makes sure the paths exist by creating them
function checkPaths(config)
{
    var configOptionsToCheck=["itemspath","completepath"];

    if (config.log)
    {
        configOptionsToCheck.push("logfilepath");
    }

    for (var x=0;x<configOptionsToCheck.length;x++)
    {
        fs.ensureDirSync(config[configOptionsToCheck[x]]);
    }
}

// given a Type VidSet, choose and launch a file, itempath should be
// path to the folder containing vids, returns the filename selected.
// if check only is set, dont actually launch the file
function selectVid(vidset,itempath,checkonly=false)
{
    var choice=_.sample(_.keys(vidset));
    var choiceArray=vidset[choice];
    choiceArray.sort((a,b)=>{
        if (a>b)
        {
            return 1;
        }

        return -1;
    });

    console.log();
    console.log(`> ${chalk.green(choice)}`);

    for (var x=0;x<choiceArray.length;x++)
    {
        if (!x)
        {
            console.log(`1. ${chalk.cyan(choiceArray[x])}`);
        }

        else
        {
            console.log(`${x+1}. ${choiceArray[x]}`);
        }
    }

    if (!checkonly)
    {
        child_process.exec(`open "${path.normalize(`${itempath}/${choiceArray[0]}`)}"`);
    }

    return choiceArray[0];
}

// given Type VidSet print it out
function printVidSet(vidset)
{
    var choices=_.keys(vidset).sort((a,b)=>{
        if (a>b)
        {
            return 1;
        }

        return -1;
    });

    for (var x=0;x<choices.length;x++)
    {
        console.log(choices[x]);
    }
}

//given a full logpath to a file and the name to log, do the log
function logToLog(logpath,selectedVid)
{
    var outfile=fs.createWriteStream(logpath,{flags:"a"});
    outfile.write(`${moment().format("YYYY-MM-DD HH:mm:ss")} ${selectedVid}\r\n`);
}

//return the args
function handleArgs()
{
    commander
    .option("-c, --check","output possible choices only");

    commander.parse(process.argv);

    return commander;
}

//try to get the config.yml which should be right next to the file
function getConfig()
{
    if (!fs.existsSync("config.yml"))
    {
        console.log("missing config.yml");
        process.exit();
    }

    var config=yaml.safeLoad(fs.readFileSync("config.yml"));

    var requiredOptions={
        "itemspath":"absolute path to folder where randomise will pick from",
        "completepath":"absolute path to send completed items",
        "log":"whether or not to log",
        "logfilepath":"path to folder to place log file",
        "logfilename":"name of logfile"
    };

    var missingOption;
    var hadAllOptions=_.every(requiredOptions,(x,i)=>{
        if (config[i])
        {
            return true;
        }

        missingOption=i;
        return false;
    });

    if (!hadAllOptions)
    {
        console.log(`missing option: ${missingOption}`);
        console.log(requiredOptions[missingOption]);
        process.exit();
    }

    checkPaths(config);
    return config;
}

function moveVid()
{
    console.log("press Enter to move file to completed");
    keypress(process.stdin);
    // process.stdin.pause();

    process.stdin.on("keypress",(ch,key)=>{
        console.log("press:",key);
        process.stdin.pause();
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
}

main();