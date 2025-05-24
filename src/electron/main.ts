import { BrowserWindow, app, ipcMain } from "electron";
import path from "path";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(app.getAppPath(), "dist-electron", "preload.cjs"),
    },
  });

  if (app.isPackaged) {
    mainWindow.loadFile(
      path.join(app.getAppPath(), "dist-react", "index.html")
    );
  } else {
    mainWindow.loadURL("http://localhost:5173");
  }
});

ipcMain.handle("get-students", async () => {
  return "hello world";
});
