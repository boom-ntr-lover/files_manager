const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ipcRendererApi', {
    send: (channel, args) => ipcRenderer.send(channel, args),
    once: (channel, listener) => ipcRenderer.once(channel, listener),
    on: (channel, listener) => ipcRenderer.on(channel, listener),
});