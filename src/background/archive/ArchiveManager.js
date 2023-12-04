import DatabaseManager from "@/background/database/DatabaseManager";
import ArchiveInfo from "@/background/archive/ArchiveInfo";

const {ipcMain} = require("electron");

class ArchiveManager
{
    constructor() {
        ///@type ArchiveInfo
        this.archiveInfoList = []

        this.bLoaded = false
    }

    static GetInstance()
    {
        if (this.instance == null)
        {
            this.instance = new ArchiveManager()
        }

        return this.instance;
    }

    // 初始化 Archive 信息，一般来自数据库载入后
    InitFromDB()
    {
        this.bLoaded = false
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

            this.bLoaded = true
        })
    }

    // 模糊搜索名字相近的 ArchiveInfo
    GetArchiveInfoByName(name)
    {
        // const regex = new RegExp(name, "i")
        return this.archiveInfoList.filter(archiveInfo => archiveInfo.name.startsWith(name))
    }

    CreateArchiveInfo(archiveInfoParam, callback)
    {
        var archiveInfo = new ArchiveInfo()
        archiveInfo.InitFromOtherArchiveInfo(archiveInfoParam)
        let sqlStr = "insert into archive_info (name, description, tag_mask) values " + archiveInfo.ToCreateDBStringData();

        DatabaseManager.Exec(sqlStr,(err, datas) =>
        {
            if (err)
            {
                callback(err, archiveInfo)
                return
            }

            this.archiveInfoList.push(archiveInfo)
            callback(null, archiveInfo)
        })
    }
}

export default ArchiveManager