import { contextBridge, ipcRenderer } from "electron";
import { ZodStudent } from "../schemas/student";

contextBridge.exposeInMainWorld("electron", {
  getStudents: async () => ipcRenderer.invoke("get-students"),
  createStudent: async (student: ZodStudent) =>
    ipcRenderer.invoke("create-student", student),
  getCourses: async () => ipcRenderer.invoke("get-courses"),
});
