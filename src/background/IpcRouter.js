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
        // Get Tag List
        ipcMain.on('get_archive_info', (event, arg) =>
        {
            DatabaseManager.GetQueryData("select * from archive_info order by " + arg.order_by,(err, data) =>
            {
                if (err)
                    console.log(err)

                event.reply('reply_test_message', data)
            })
        })
    }
}

export default IpcRouter