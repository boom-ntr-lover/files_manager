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
        const isDevelopment = process.env.NODE_ENV !== 'production'
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

                // db.run("select * from test")
                db.all("select * from test", (err, row) =>
                {
                    if (err)
                        console.log("测试失败？", err)
                })
            })

            this.db = db
        })
    }

    TestLink(callback)
    {
        if (!this.bLoaded)
            return null;

        this.db.all("SELECT * FROM test", (err, row) =>
        {
            var data = {}
            if (err)
            {
                console.log('--------------------Test Read DatabaseErr', err)
                return;
            }

            for (var key in row)
            {
                data[key] = row[key]
            }

            callback(data)
        })
    }
}

export default DatabaseManager