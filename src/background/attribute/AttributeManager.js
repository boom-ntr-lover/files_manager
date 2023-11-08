import {join} from "path";

class AttributeManager
{
    constructor() {
        this.instance = null
    }

    static GetInstance()
    {
        if (!this.instance)
        {
            this.instance = new AttributeManager()
        }

        return this.instance;
    }

    GetTagNameByMask(mask)
    {
        // return join("tag", mask.toString())
    }
}

export default AttributeManager