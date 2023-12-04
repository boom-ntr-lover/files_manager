class ArchiveInfo {
    constructor() {
        this.id = 0

        this.score =0
        this.name = ""
        this.description = ""
        this.tagMask = 0

        // List Of FileInfo
        this.fileInfoList = []

        // List Of Attribute
        this.attributeInfoList = []
    }

    /// from db archive_info
    InitFromDB(dbData)
    {
        this.id = dbData.id
        this.name = dbData.name
        this.description = dbData.description
        this.tagMask = dbData.tag_mask
    }

    InitFromOtherArchiveInfo(other)
    {
        this.id = other.id
        this.name = other.name
        this.description = other.description
        this.tagMask = other.tagMask
    }

    ToCreateDBStringData()
    {
        return "('" + this.id + "', '" + this.name + "', '" + this.description + "', " + this.tagMask + ")"
    }

    toString()
    {
        return "ArchiveInfo: id=" + this.id
            + " name=" + this.name
            + " description=" + this.description
            + " tagMask=" + this.tagMask
    }

    AddFileInfo(fileInfo)
    {
        this.fileInfoList.push(fileInfo)
    }
}

export default ArchiveInfo