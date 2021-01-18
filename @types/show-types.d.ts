/** represents a single show file. */
interface ShowItem
{
    filename:string
    fullPath:string
}

/** represent a show, which includes one or more show files. */
interface Show
{
    items:ShowItem[]
    shortname:string
    isShort:boolean
}

/** show items grouped by short name (key) */
type GroupedShowItems=Record<string,ShowItem[]>

/** object with shows mapped by their show names (key) */
type ShowsDict=Record<string,Show>