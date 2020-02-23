const randomNumber=require("random-number-csprng");

async function main()
{
    var items=[
        "bangdreams",
        "eizoukenniwatewodasuna",
        "heyacamp*",
        "magiarecord",
        "natsunagu",
        "oshigabudoukanittekuretarashinu",
        "showbyrockmashumairesh",
        "toarukagakunorailgunt",
        "yatogamechankansatsunikkis"
    ];

    console.log(await cspSample(items));
}

// does the same thing as sample, returning random item from an input array
async function cspSample(dataarray)
{
    return dataarray[await randomNumber(0,dataarray.length-1)];
}

main();