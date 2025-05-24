import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  getStudents: async () => ipcRenderer.invoke("get-students"),
});
