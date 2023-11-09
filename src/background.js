'use strict'

import {app, protocol, BrowserWindow} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer'
import path from "path";

import IpcRouter from "@/background/IpcRouter";
import DatabaseManager from "@/background/database/DatabaseManager";
import ArchiveManager from "@/background/archive/ArchiveManager";
import GameHelper from "@/background/util/GlobalHelper";
import GlobalHelper from "@/background/util/GlobalHelper";

const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])

async function LoadingBackground()
{
    DatabaseManager.GetInstance().Init()

    // register ipc router
    // IpcRouter.GetInstance().Setup()
    IpcRouter.Setup()
}

async function createWindow()
{
    // 初始化
    LoadingBackground()

    // Create the browser window.
    const win = new BrowserWindow({
        width: 900,
        height: 600,
        minWidth: 900,
        webPreferences: {
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,

            preload: path.join(__dirname, 'preload.js'),
        },

        icon: path.join(__dirname, 'assets/file-star.ico')
    })

    GlobalHelper.GetInstance().mainWindow = win

    if (process.env.WEBPACK_DEV_SERVER_URL)
    {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)

        if (!process.env.IS_TEST) win.webContents.openDevTools({
            mode: 'bottom'
        })
    }
    else
    {
        createProtocol('app')
        // Load the index.html when not in development
        win.loadURL('app://./index.html')
    }
}

// Quit when all windows are closed.
app.on('window-all-closed', () =>
{
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin')
    {
        app.quit()
    }
})

app.on('activate', () =>
{
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () =>
{
    if (isDevelopment && !process.env.IS_TEST)
    {
        // Install Vue Devtools
        try
        {
            await installExtension(VUEJS_DEVTOOLS)
        } catch (e)
        {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }
    createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment)
{
    if (process.platform === 'win32')
    {
        process.on('message', (data) =>
        {
            if (data === 'graceful-exit')
            {
                app.quit()
            }
        })
    } else
    {
        process.on('SIGTERM', () =>
        {
            app.quit()
        })
    }
}
