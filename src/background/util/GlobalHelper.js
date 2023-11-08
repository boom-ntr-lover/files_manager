class GlobalHelper
{
    constructor() {
        this.mainWindow = null
    }

    static GetInstance()
    {
        if (this.instance == null)
        {
            this.instance = new GlobalHelper()
        }
        return this.instance;
    }

    GetMainWindow()
    {
        return this.mainWindow
    }
}

export default GlobalHelper