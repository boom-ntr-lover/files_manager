// 存档单例
// 存档仅存在一份
class ArchiveManager {
    constructor() {
        this.instance = null;
    }

    static getInstance( ){
        if(!this.instance) {
            this.instance = new ArchiveManager();
        }

        return this.instance;
    }

    // 保存存档
    saveArchives() {

    }
}

module.exports = ArchiveManager
