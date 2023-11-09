import ArchiveManager from "@/background/archive/ArchiveManager";
import FileManager from "@/background/file/FileManager";
import EventHelper from "@/background/util/EventHelper";
const { ipcMain, webContents} = require("electron");

export default {
    Setup()
    {
        // Require To Prepare Local Files
        ipcMain.on('require_scan_local_files', (event, arg) =>
        {
            FileManager.GetInstance().ScanFileInfoFromPath(null)
        })

        // Get FileInfo List
        ipcMain.on('require_file_info_list', (event, arg) =>
        {
            event.reply('reply_file_info_list', FileManager.GetInstance().fileInfoList)
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