import DatabaseManager from "@/background/database/DatabaseManager";
import TagInfo from "@/background/attribute/TagInfo";

class AttributeManager
{
    constructor() {
        this.instance = null

        /// TagInfo
        this.tags = []
    }

    static GetInstance()
    {
        if (!this.instance)
        {
            this.instance = new AttributeManager()
        }

        return this.instance;
    }

    RefreshDBTagsFromDB()
    {
        DatabaseManager.GetQueryData("select * from archive_tag",(err, datas) =>
        {
            if (err)
            {
                console.log(err)
                return
            }

            this.tags = []
            for (let i = 0; i < datas.length; i++)
            {
                let data = datas[i]
                var tag = new TagInfo()
                tag.InitFromDB(data)
                console.log(tag)
                this.tags.push(tag)
            }
        })
    }

    GetTagNameByMask(mask)
    {
        // return join("tag", mask.toString())
    }
}

export default AttributeManager