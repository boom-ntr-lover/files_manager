import * as sqlite3 from "sqlite3";
import fs from 'fs'
import ArchiveManager from "@/background/archive/ArchiveManager";
import FileManager from "@/background/file/FileManager";

class DatabaseManager
{
    constructor() {
        this.bLoaded = false

        this.sqlFilePath = "./public/sql/create_table.sql"

        this.dbPath = "/data/"
        this.dbFileName = "Default.db"

        //type: sqlite3.Database
        this.archiveDB = null
    }

    static GetInstance()
    {
        if (!this.instance)
        {
            this.instance = new DatabaseManager()
        }

        return this.instance;
    }

    Init()
    {
        this.ConnectToDB(this.dbFileName)
    }

    ConnectToDB(fileName)
    {
        let filePath = FileManager.GetInstance().GetDBFilePath(fileName)

        const db = new sqlite3.Database(filePath, (err) =>
        {
            if (err)
            {
                console.error('👉👉👉 Connect Database Err' + err.message);
                return;
            }

            console.log('👉👉👉 Sqlite3 已经连接成功')

            // 初始化数据库
            const initSqlStr = fs.readFileSync(this.sqlFilePath).toString();
            db.exec(initSqlStr, (err) =>
            {
                if (err)
                    console.log(err);

                console.log("👉👉👉 Finish Init Database")

                this.bLoaded = true
                this.archiveDB = db

                // 初始化其他模块中，关于数据库的部分
                ArchiveManager.GetInstance().InitFromDB()
            })
        });
    }

    static GetQueryData(sqlStr, callback)
    {
        let instance = DatabaseManager.GetInstance()
        if (!instance.bLoaded)
        {
            console.log("Err: Database Not Loaded")
            return;
        }

        instance.archiveDB.all(sqlStr, (err, row) =>
        {
            if (err)
            {
                callback(err)
                return;
            }

            callback(null, row)
        })
    }

    static Exec(sqlStr, callback)
    {
        let instance = DatabaseManager.GetInstance()
        if (!instance.bLoaded)
        {
            console.log("Err: Database Not Loaded")
            return;
        }

        instance.archiveDB.all(sqlStr, (err, row) =>
        {
            if (err)
            {
                callback(err)
                return;
            }

            callback(null, row)
        })
    }
}

export default DatabaseManager