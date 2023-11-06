class ArchiveInfo {
    constructor() {
        this.id = 0
        this.name = ""
        this.description = ""
        this.tagMask = 0

        // List Of FileInfo
        this.filtInfoList = {}

        // List Of Attribute
        this.attributeInfoList = {}
    }

    /// from db archive_info
    InitFromDB(dbData)
    {
        this.id = dbData.id
        this.name = dbData.name
        this.description = dbData.description
        this.tagMask = dbData.tag_mask
    }

    toString()
    {
        return "ArchiveInfo: id=" + this.id
            + " name=" + this.name
            + " description=" + this.description
            + " tagMask=" + this.tagMask
    }
}

export default ArchiveInfo