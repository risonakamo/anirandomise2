type Command=import("commander").Command

interface AnirandomiseAction
{
    action:"addshort"|"register"|"randomise"|"check"|"rngtest"|"unset"
}

interface AddShortAction extends AnirandomiseAction
{
    action:"addshort"
    shortName:string
}

interface RegisterAction extends AnirandomiseAction
{
    action:"register"
    type:"vids"|"delete"|"logfile"
    path:string
}

interface TestRngAction extends AnirandomiseAction
{
    action:"rngtest"
    iterations:number
}