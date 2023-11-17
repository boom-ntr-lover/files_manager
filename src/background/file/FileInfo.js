var maxId = 0;

class FileInfo {
    constructor(fileName) {
        this.id = maxId++

        this.fileName = fileName

        this.absPath = ""

        // 反向链到 ArchiveInfo
        this.pArchiveInfo = null

        // Belong FolderInfo
        this.folderInfo = null
    }
}

export default FileInfo