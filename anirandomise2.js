const _=require("lodash");
const yaml=require("js-yaml");
const fs=require("fs-extra");
const path=require("path");

function main()
{
    if (!fs.existsSync("config.yml"))
    {
        console.log("missing config.yml");
        return;
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
        return;
    }

    checkPaths(config);

    var dirItems=fs.readdirSync(config.itemspath,{withFileTypes:true});
    dirItems=_.filter(dirItems,(x)=>{
        return x.isFile();
    });

    var vidset=convertVidSet(dirItems);

    console.log(vidset);
}

//given a readdir array, convert it into a vidset, a dict:
/*{
    [simplifiedName]: [string]  //array of file names corresponding to the
                                //simplified name key
  }*/
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

main();