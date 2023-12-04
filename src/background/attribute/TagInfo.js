class TagInfo
{
    constructor()
    {
        this.value = 0
        this.name = ""
    }

    InitFromDB(data)
    {
        this.value = data.tag_val
        this.name = data.name
        this.bActive = data.active
    }
}

export default TagInfo