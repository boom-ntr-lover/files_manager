const { contextBridge, ipcRenderer } = require('electron')
const AttributeManager = require('@/background/attribute/AttributeManager');

contextBridge.exposeInMainWorld('ipcRendererApi', {
    send: (channel, args) => ipcRenderer.send(channel, args),
    sendSync: (channel, listener) => ipcRenderer.sendSync(channel, listener),

    once: (channel, listener) => ipcRenderer.once(channel, listener),
    on: (channel, listener) => ipcRenderer.on(channel, listener),
});
