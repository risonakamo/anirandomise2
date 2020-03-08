const yaml=require("js-yaml");
const fs=require("fs-extra");

// ASYNC
function recordStats(statsFilePath,choice,numberChoices)
{
    var statsfile;
    if (fs.existsSync(statsFilePath))
    {
        statsfile=yaml.safeLoad(fs.readFileSync(statsFilePath));
    }

    else
    {
        statsfile={};
    }

    if (!statsfile[choice])
    {
        statsfile[choice]=[];
    }

    statsfile[choice].push(numberChoices);

    fs.outputFile(statsFilePath,yaml.safeDump(statsfile,{flowLevel:1}));
}

function main()
{
    recordStats("stats.yml","a",4);
}

if (!module.parent)
{
    main();
}

module.exports=recordStats;