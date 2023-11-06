const {ipcMain} = require("electron");

class IpcRouter
{
    constructor()
    {
        this.instance = null
    }

    static GetInstance()
    {
        if (!this.instance)
        {
            this.instance = new IpcRouter()
        }

        return this.instance
    }

    setup()
    {
        console.log("setup")
        // Debug
        ipcMain.on('send_test_message', (event, arg) =>
        {
            event.reply('reply_test_message', 'Hello from main process!')
        })
    }
}

export default IpcRouter