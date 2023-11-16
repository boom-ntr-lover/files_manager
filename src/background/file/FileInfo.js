class FileInfo {
    constructor(fileName) {
        this.fileName = fileName
        this.absPath = ""

        // 反向链
        this.pArchiveInfo = null

        // Belong FolderInfo
        this.folderInfo = null
    }
}

export default FileInfo