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

    SendToRenderer(eventName, ...args)
    {

    }
}

export default EventHelper