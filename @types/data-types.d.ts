/** main data storage of anirandomise */
interface AnirandomiseData
{
    // list of shortnames that are should be considered shorts
    shorts:string[]

    // the previous selection
    previousSelection:string|null

    config:AnirandomiseConfig
}

interface AnirandomiseConfig
{
    vidsPath:string|null
    deletePath:string|null
    logfilePath:string|null
}