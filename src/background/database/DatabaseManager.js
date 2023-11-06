import * as sqlite3 from "sqlite3";
import path from "path";
import fs from 'fs'

class DatabaseManager
{
    constructor() {
        this.instance = null

        this.bLoaded = false

        this.dbPath = "/data/"
        this.dbFileName = "Test.db"
        this.dbFilePath = ""

        this.sqlFilePath = "./public/sql/create_table.sql"

        //type: sqlite3.Database
        this.db = null
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
        this.dbFilePath = path.join('./', this.dbPath, this.dbFileName)
        console.log('Try Access Database:' + this.dbFilePath)

        fs.access(this.dbFilePath, (err)=>
        {
            if (err)
            {
                fs.writeFile(this.dbFilePath,'',(err)=>{
                    if (err) {
                        console.log('Create', this.dbFilePath, 'Error:', err)
                    }
                })
            }
        })

        var db = new sqlite3.Database(this.dbFilePath, (err) => {
            if (err) {
                console.error('--------------------connectDatabaseErr' + err.message);
                return;
            }

            console.log('👉👉👉-----------------sqlite3已经连接成功')

            // 初始化数据库
            const initSqlStr = fs.readFileSync(this.sqlFilePath).toString();
            db.exec(initSqlStr, (err) =>
            {
                if (err)
                    console.log(err);

                console.log("Finish Init Database")
                this.bLoaded = true
            })

            this.db = db
        })
    }

    static GetQueryData(sqlStr, callback)
    {
        let instance = DatabaseManager.GetInstance()
        if (!instance.bLoaded)
        {
            console.log("Database Not Loaded")
            return;
        }

        if (process.env.NODE_ENV !== 'production')
            console.log("====: Do Sql Query: \n", sqlStr)

        instance.db.all(sqlStr, (err, row) =>
        {
            let data = {}
            if (err)
            {
                callback(err)
                return;
            }

            for (let key in row)
            {
                data[key] = row[key]
            }

            callback(null, data)
        })
    }
}

export default DatabaseManager