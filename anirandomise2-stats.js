const _=require("lodash");
const fs=require("fs-extra");

// ASYNC
/* attempt to record stats of choices into a file, specified by statsFilePath.*/
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

function main()
{
    recordStats("stats.yml","a",4);
}

if (!module.parent)
{
    main();
}

module.exports=recordStats;