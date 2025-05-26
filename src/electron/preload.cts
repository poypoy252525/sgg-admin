import { contextBridge, ipcRenderer } from "electron";
import { ZodStudent } from "../schemas/student";
import { Student } from "../../generated/prisma";

contextBridge.exposeInMainWorld("electron", {
  getStudents: async () => ipcRenderer.invoke("get-students"),
  getStudent: async (id: number) => ipcRenderer.invoke("get-student", id),
  createStudent: async (student: ZodStudent) =>
    ipcRenderer.invoke("create-student", student),
  deleteStudent: async (id: number) => ipcRenderer.invoke("delete-student", id),
  getCourses: async () => ipcRenderer.invoke("get-courses"),
});
