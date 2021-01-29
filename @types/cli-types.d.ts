type Command=import("commander").Command

interface AnirandomiseAction
{
    action:"addshort"|"register"|"randomise"|"check"|"unset"
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