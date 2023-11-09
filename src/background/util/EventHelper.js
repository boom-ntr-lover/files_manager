import GlobalHelper from "@/background/util/GlobalHelper";

var events = require('events');

class EventHelper
{
    constructor() {
        this.emitter = new events.EventEmitter();
    }

    static GetInstance()
    {
        if (this.instance == null)
        {
            this.instance = new EventHelper()
        }
        return this.instance;
    }

    On(eventName, func)
    {
        this.emitter.on(eventName, func)
    }

    Emit(eventName, ...args)
    {
        this.emitter.emit(eventName, ...args)
    }

    static SendToRenderer(eventName, ...args)
    {
        GlobalHelper.GetInstance().mainWindow.webContents.send(eventName, ...args)
    }
}

export default EventHelper