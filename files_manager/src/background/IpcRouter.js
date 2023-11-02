const { ipcMain} = require("electron");
import ArchiveManager from "@/background/archive/ArchiveManager";

module.exports = {
    setup: function() {
        var archiveMan = new ArchiveManager();

        ipcMain.on('prepare_data', (event, arg) => {
            event.reply('reply_prepare_data', arg)
        })
    },
};