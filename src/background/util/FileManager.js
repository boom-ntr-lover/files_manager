import { join } from "path";
import fs from "fs";

class FileManager
{
    constructor() {
        this.dbPathRoot = "./data/"

        if (!fs.existsSync(this.dbPathRoot))
        {
            fs.mkdirSync(this.dbPathRoot, { recursive: true });
        }
    }

    static GetInstance()
    {
        if (this.instance == null)
        {
            this.instance = new FileManager()
        }

        return this.instance;
    }

    GetDBFilePath(fileName)
    {
        let filePath = join('./', this.dbPathRoot, fileName)

        fs.access(filePath, (err)=>
        {
            if (err)
            {
                fs.writeFile(filePath,'',(err)=>{
                    if (err) {
                        console.log('Create', filePath, 'Error:', err)
                    }
                })
            }
        })

        return filePath
    }
}

export default FileManager