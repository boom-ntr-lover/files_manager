import { join, extname } from "path";
import fs from "fs";
import FileInfo from "@/background/file/FileInfo";
import EventHelper from "@/background/util/EventHelper";
import GlobalHelper from "@/background/util/GlobalHelper";

class FileManager
{
    constructor() {
        this.dbPathRoot = "./data/"
        this.testScanPathRoot = "./TestScanFilePath"

        /// FileInfo
        this.fileInfoList = []

        // DB目录如果不存在则开场创建一个
        if (!fs.existsSync(this.dbPathRoot))
        {
            fs.mkdirSync(this.dbPathRoot, { recursive: true });
        }
    }

    static GetInstance()
    {
        if (this.instance == null)
        {
            this.instance = new FileManager()
        }

        return this.instance;
    }

    // 根据文件名获取数据库文件路径
    GetDBFilePath(fileName)
    {
        let filePath = join('./', this.dbPathRoot, fileName)

        fs.access(filePath, (err)=>
        {
            if (err)
            {
                fs.writeFile(filePath,'',(err)=>{
                    if (err) {
                        console.error('Create', filePath, 'Error:', err)
                    }
                })
            }
        })

        return filePath
    }

    // 根据文件名获取数据库文件内容
    ScanFileInfoFromPath(rootPath)
    {
        if (rootPath == null) rootPath = this.testScanPathRoot

        EventHelper.SendToRenderer('reply_scan_local_files', false, 0, 10, '开始扫描文件...')

        // 清理文件信息
        for (let i = this.fileInfoList.length - 1; i >= 0; --i)
            this.RemoveFileInfo(i)

        // 读取目录中的所有文件路径
        this.ReadFileInfoFromPath(rootPath, [], this.fileInfoList)

        EventHelper.SendToRenderer('reply_scan_local_files', true, 100, 100, '扫描文件完毕')
    }

    ReadFileInfoFromPath(rootPath, inputParenDir, fileInfoList)
    {
        let parentDir = []
        inputParenDir.forEach((dir) => {
            parentDir.push(dir)
        })

        let files = fs.readdirSync(rootPath)
        // 读取目录中的所有文件
        if (!files)
        {
            console.error("Cannot Read Files")
            return
        }

        let fileCount = files.length

        for (let i = 0; i < fileCount; i++)
        {
            let fileName = files[i]
            const filePath = join(rootPath, fileName);
            let stats = fs.statSync(filePath)
            if (!stats)
                console.warn('获取文件stats失败');
            else
            {
                const isFile = stats.isFile();      //是文件
                const isDir = stats.isDirectory();  //是文件夹
                if (isDir)
                {
                    let outParentDir = []
                    inputParenDir.forEach((dir) => {
                        outParentDir.push(dir)
                    })
                    outParentDir.push(fileName)
                    this.ReadFileInfoFromPath(filePath, outParentDir, fileInfoList)
                }
                else if (isFile)
                {
                    // 返回文件名数组
                    if (
                        fileName.endsWith('.mp4')
                        || fileName.endsWith('.avi')
                    )
                    {
                        let fileInfo = new FileInfo(fileName)
                        fileInfo.absPath = filePath
                        parentDir.forEach((dir) => {
                            fileInfo.parentDir.push(dir)
                        })
                        fileInfoList.push(fileInfo)
                    }
                }
            }
        }
    }

    // 销毁文件信息
    RemoveFileInfo(index)
    {
        let fileInfo = this.fileInfoList[index]
        if (fileInfo == null) return
        this.fileInfoList.splice(index, 1)

        let archiveInfo = fileInfo.pArchiveInfo
        if (archiveInfo != null)
            archiveInfo.filtInfoList.splice(archiveInfo.filtInfoList.indexOf(fileInfo), 1)
    }
}

export default FileManager