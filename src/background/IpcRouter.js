const sqlite3 = require('sqlite3')
const {ipcMain} = require("electron");
import DatabaseManager from "@/background/database/DatabaseManager";

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
        // Debug
        ipcMain.on('send_test_message', (event, arg) =>
        {
            DatabaseManager.GetInstance().TestLink((data) =>
            {
                event.reply('reply_test_message', data)
            })
        })
    }
}

export default IpcRouter