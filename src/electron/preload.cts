import { contextBridge, ipcRenderer } from "electron";
import { ZodStudent } from "../schemas/student";
import { ZodCourse } from "../schemas/course";
import { Competency } from "../../generated/prisma";
import { ZodSubject } from "../schemas/subject";

contextBridge.exposeInMainWorld("electron", {
  getStudents: async () => ipcRenderer.invoke("get-students"),
  getStudent: async (id: number) => ipcRenderer.invoke("get-student", id),
  createStudent: async (student: ZodStudent) =>
    ipcRenderer.invoke("create-student", student),
  deleteStudent: async (id: number) => ipcRenderer.invoke("delete-student", id),
  getCourses: async () => ipcRenderer.invoke("get-courses"),
  getCourse: async (id: number) => ipcRenderer.invoke("get-course", id),
  createCourse: async (course: ZodCourse) =>
    ipcRenderer.invoke("create-course", course),
  createCompetency: async (competency: Competency) =>
    ipcRenderer.invoke("create-competency", competency),
  getCompetencies: async () => ipcRenderer.invoke("get-competencies"),
  createSubject: async (subject: ZodSubject) =>
    ipcRenderer.invoke("create-subject", subject),
  getSubjects: async () => ipcRenderer.invoke("get-subjects"),
});
