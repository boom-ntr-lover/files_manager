class ArchiveManager
{
    constructor() {
        this.instance = null

        ///@type ArchiveInfo
        this.archiveInfoList = {}
    }

    static GetInstance()
    {
        if (!this.instance)
        {
            this.instance = new ArchiveManager()
        }

        return this.instance;
    }
}

export default ArchiveManager