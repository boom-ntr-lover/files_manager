class FileInfo {
    constructor(fileName) {
        this.fileName = fileName
        this.absPath = ""
        this.parentDir = []

        // 反向链
        this.pArchiveInfo = null
    }
}

export default FileInfo