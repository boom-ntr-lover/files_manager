import DatabaseManager from "@/background/database/DatabaseManager";
import ArchiveInfo from "@/background/archive/ArchiveInfo";

class ArchiveManager
{
    constructor() {
        ///@type ArchiveInfo
        this.archiveInfoList = []
    }

    static GetInstance()
    {
        if (ArchiveManager.instance == null)
        {
            ArchiveManager.instance = new ArchiveManager()
        }

        return ArchiveManager.instance;
    }

    InitFromDB()
    {
        this.archiveInfoList = []
        DatabaseManager.GetQueryData("select * from archive_info order by id",(err, datas) =>
        {
            if (err)
            {
                console.log(err)
                return
            }

            for (let i = 0; i < datas.length; i++)
            {
                let data = datas[i]

                var archiveInfo = new ArchiveInfo()
                archiveInfo.InitFromDB(data)
                this.archiveInfoList.push(archiveInfo)
            }
        })
    }
}

export default ArchiveManager