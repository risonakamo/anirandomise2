/** represents a single show file. */
interface ShowItemSimple
{
    filename:string
    fullPath:string
}

/** represents a single show file with short field */
interface ShowItem extends ShowItemSimple
{
    isShort:boolean
}

/** represent a show, which includes one or more show files. */
interface Show
{
    items:ShowItem[]
    topShow:ShowItem
    shortname:string
    isShort:boolean
}

/** show items (simple) grouped by short name (key) */
type GroupedShowItemsSimple=Record<string,ShowItemSimple[]>

/** show items grouped by short name (key) */
type GroupedShowItems=Record<string,ShowItem[]>

/** object with shows mapped by their show names (key) */
type ShowsDict=Record<string,Show>