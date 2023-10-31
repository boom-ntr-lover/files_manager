const {ipcMain} = require("electron");
const ArchiveManager = require("./manager/ArchiveManager");

module.exports = {
    init: function() {
        // debug
        ipcMain.on('send_test_message', (event, arg) => {
            event.reply('reply_test_message', 'Hello from main process!')

            // var archiveManager = ArchiveManager.getInstance()
            // archiveManager.save()
        })
    },
    name: 'Tom'
};