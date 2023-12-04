var maxId = 0;

class FileInfo {
    constructor(fileName) {
        this.id = maxId++

        this.fileName = fileName

        let names = fileName.split('.')
        if (names.length > 0)
        {
            this.name = names[0]
        }

        this.absPath = ""

        // 反向链到 ArchiveInfo
        this.pArchiveInfo = null

        // Belong FolderInfo
        this.folderInfo = null
    }
}

export default FileInfo