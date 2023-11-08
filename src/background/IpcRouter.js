import ArchiveManager from "@/background/archive/ArchiveManager";

const sqlite3 = require('sqlite3')
const {ipcMain} = require("electron");
import DatabaseManager from "@/background/database/DatabaseManager";

class IpcRouter
{
    constructor()
    {
        this.instance = null
    }

    static GetInstance()
    {
        if (!this.instance)
        {
            this.instance = new IpcRouter()
        }

        return this.instance
    }

    Setup()
    {
        // 检查 ArchiveManager 是否加载数据库
        ipcMain.on('check_archive_loaded', (event, arg) =>
        {
            let archiveManager = ArchiveManager.GetInstance()
            event.reply('reply_archive_loaded', archiveManager.bLoaded)
        })

        // Get Tag List
        ipcMain.on('get_archive_info', (event, arg) =>
        {
            let archiveManager = ArchiveManager.GetInstance()
            event.reply('reply_archive_info', archiveManager.archiveInfoList)
        })
    }
}

export default IpcRouter