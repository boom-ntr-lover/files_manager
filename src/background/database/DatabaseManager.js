import * as sqlite3 from "sqlite3";
import path from "path";
import fs from 'fs'

class DatabaseManager
{
    constructor() {
        this.instance = null

        this.dbPath = "/data/"
        this.dbFileName = "Test.db"
        this.dbFilePath = ""

        this.sqlFilePath = "./public/sql/create_table.sql"
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

        const db = new sqlite3.Database(this.dbFilePath, (err) => {
            if (err) {
                console.error('--------------------connectDatabaseErr' + err.message);
                return;
            }

            console.log('👉👉👉-----------------sqlite3已经连接成功')

            const dataSql = fs.readFileSync(this.sqlFilePath).toString();
            db.exec(dataSql)
        })
    }
}

export default DatabaseManager