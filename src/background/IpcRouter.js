import ArchiveManager from "@/background/archive/ArchiveManager";
import FileManager from "@/background/file/FileManager";
const {ipcMain} = require("electron");

export default {
    Setup()
    {
        // Require To Prepare Local Files
        ipcMain.on('require_scan_local_files', (event, arg) =>
        {
            FileManager.GetInstance().ScanFileInfoFromPath(null, (bFinished, percent, subPercent, message) =>
            {
                event.reply('reply_scan_local_files', bFinished, percent, subPercent, message || "加载中")
            })
        })

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