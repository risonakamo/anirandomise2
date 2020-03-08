const _=require("lodash");
const fs=require("fs-extra");

// ASYNC
//see statsreadme for how stats works
function recordStats(statsFilePath,choice,numberChoices)
{
    var statsfile;
    if (fs.existsSync(statsFilePath))
    {
        try
        {
            statsfile=fs.readJsonSync(statsFilePath);
        }

        catch (e)
        {
            statsfile={};
        }
    }

    else
    {
        statsfile={};
    }

    var choiceChances={};
    if (statsfile.choiceChances)
    {
        choiceChances=statsfile.choiceChances;
    }

    if (!choiceChances[choice])
    {
        choiceChances[choice]=[];
    }

    choiceChances[choice].push(numberChoices);

    statsfile.choiceChances=choiceChances;
    statsfile.totals=calcTotals(choiceChances);
    statsfile.averages=calcAverages(choiceChances);

    fs.outputJson(statsFilePath,statsfile,{spaces:4});
}

// give choice chances object, calculates totals
function calcTotals(stats)
{
    var vidtotals=_.mapValues(stats,(x)=>{
        return _.reduce(x,(r,y)=>{
            return y+r;
        },0);
    });

    vidtotals.total=_.reduce(vidtotals,(r,x)=>{
        return r+x;
    },0);

    return vidtotals;
}

// give it choice chances object
function calcAverages(stats)
{
    return _.mapValues(stats,(x)=>{
        return _.reduce(x,(r,y)=>{
            return r+y;
        },0)/x.length;
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