import ArchiveManager from "@/background/archive/ArchiveManager";
import FileManager from "@/background/file/FileManager";
import EventHelper from "@/background/util/EventHelper";
import {app} from "electron";

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

        // 检查 ArchiveManager 是否加载数据库
        ipcMain.on('check_archive_loaded', (event, arg) =>
        {
            let archiveManager = ArchiveManager.GetInstance()
            event.reply('reply_archive_loaded', archiveManager.bLoaded)
        })

        // Folder 列表
        ipcMain.on('require_folder_list', (event, arg) =>
        {
            event.reply('reply_folder_list', FileManager.GetInstance().rootFolder)
        })

        // Get FileInfo List
        ipcMain.on('require_append_file_info_list', (event, args) =>
        {
            let folderId = args.folderId
            let fileMan = FileManager.GetInstance()
            var targetFolderInfo = fileMan.GetFolderInfoById(folderId, fileMan.rootFolder)
            if (targetFolderInfo)
                event.reply('reply_append_file_info_list', targetFolderInfo)
        })

        // Folder 列表
        ipcMain.on('query_archive_info_list_by_name', (event, file_name) =>
        {
            event.reply('reply_query_archive_info_list_by_name', ArchiveManager.GetInstance().GetArchiveInfoByName(file_name))
        })

        // 创建 Archive
        ipcMain.on('create_archive_info', (event, archiveInfoParam) =>
        {
            console.log(archiveInfoParam)
            ArchiveManager.GetInstance().CreateArchiveInfo(archiveInfoParam, (err, res) =>
            {
                event.reply('reply_create_archive_info', err, res)
            })
        })

        // Get Tag List
        ipcMain.on('get_archive_info', (event, arg) =>
        {
            let archiveManager = ArchiveManager.GetInstance()
            event.reply('reply_archive_info', archiveManager.archiveInfoList)
        })

        ipcMain.on('test_play_file', (event, filePath) =>
        {
            var res
            if (process.platform === 'darwin')
                res = exec("open " + filePath);
            else
                res = exec("start " + filePath);

        })
    }
}