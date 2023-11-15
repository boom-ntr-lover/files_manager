import ArchiveManager from "@/background/archive/ArchiveManager";
import FileManager from "@/background/file/FileManager";
import EventHelper from "@/background/util/EventHelper";

const { ipcMain, webContents} = require("electron");
const { execFile, exec } = require("child_process")

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

        ipcMain.on('test_play_file', (event, arg) =>
        {
            // 执行查询命令
            let filePath = "/Users/wangzixiao/Github/files_manager/TestScanFilePath/dir0_fle1.txt";
            const res = exec("open " + filePath);
        })
    }
}