const { ipcMain} = require("electron");

module.exports = {

    setup: function() {
        // Debug
        ipcMain.on('send_test_message', (event, arg) => {
            event.reply('reply_test_message', 'Hello from main process!')
        })
    },
};