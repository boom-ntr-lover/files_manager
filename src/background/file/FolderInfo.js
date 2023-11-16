var maxId = 0;

class FolderInfo {
    constructor(folderName) {
        this.id = maxId++

        this.folderName = folderName

        this.parentFolder = null
        this.childFolder = []

        this.fileInfoList = []
    }
}

export default FolderInfo