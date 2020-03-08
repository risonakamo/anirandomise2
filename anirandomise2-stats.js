const _=require("lodash");
const yaml=require("js-yaml");
const fs=require("fs-extra");

// ASYNC
function recordStats(statsFilePath,choice,numberChoices)
{
    var statsfile;
    if (fs.existsSync(statsFilePath))
    {
        statsfile=yaml.safeLoad(fs.readFileSync(statsFilePath));

        if (!statsfile)
        {
            statsfile={};
        }
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

    // statsfile.totals=calcTotals(statsfile);

    fs.outputFile(statsFilePath,yaml.safeDump(statsfile));
}

// give entire stats object, calculates totals
function calcTotals(stats)
{
    return _.mapValues(stats,(x)=>{
        return _.reduce(x,(r,y)=>{
            return y+r;
        },0);
    });
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