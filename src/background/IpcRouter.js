import ArchiveManager from "@/background/archive/ArchiveManager";
import FileManager from "@/background/file/FileManager";
import EventHelper from "@/background/util/EventHelper";
import {app} from "electron";
import AttributeManager from "@/background/attribute/AttributeManager";

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
            ArchiveManager.GetInstance().CreateArchiveInfo(archiveInfoParam, (err, res) =>
            {
                event.reply('reply_create_archive_info', err, res)
            })
        })

        // Get Tag List
        ipcMain.on('require_tag_list', (event, arg) =>
        {
            let attributeMgr = AttributeManager.GetInstance()
            event.reply('reply_tag_list', attributeMgr.tags)
        })

        // Get Archive List
        ipcMain.on('get_archive_info', (event, arg) =>
        {
            let archiveManager = ArchiveManager.GetInstance()
            event.reply('reply_archive_info', archiveManager.archiveInfoList)
        })

        // 追加文件到 Archive 上
        ipcMain.on('add_file_to_archive', (event, args) =>
        {
            let inputFileInfo = args.fileInfo
            let inputArchiveInfo = args.archiveInfo

            let fileInfo = FileManager.GetInstance().GetFileInfo(inputFileInfo.id)
            let pArchiveInfo = fileInfo.pArchiveInfo
            if (pArchiveInfo)
            {
                event.reply('reply_add_file_to_archive', false, "Already Have PreArchive")
                return
            }

            let archiveInfo = ArchiveManager.GetInstance().GetArchiveInfoById(inputArchiveInfo.id)
            if (archiveInfo)
            {
                archiveInfo.AddFileInfo(fileInfo)
                fileInfo.pArchiveInfo = archiveInfo

                event.reply('reply_add_file_to_archive', true)
            }
            else
            {
                event.reply('reply_add_file_to_archive', false, "Cannot Find Archive")
            }
        })

        // 播放文件
        ipcMain.on('play_file', (event, filePath) =>
        {
            var res
            if (process.platform === 'darwin')
                res = exec("open " + filePath);
            else
                res = exec("start " + filePath);
        })
    }
}