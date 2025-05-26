import { BrowserWindow, app, ipcMain } from "electron";
import path from "path";
import { PrismaClient, Sex } from "../../generated/prisma/index.js";
import { chmodSync, existsSync } from "fs";
import { ZodStudent } from "../schemas/student.js";

const dbPath = app.isPackaged
  ? path.join(process.resourcesPath, "prisma", "dev.db")
  : path.join(app.getAppPath(), "prisma", "dev.db");

if (app.isPackaged && existsSync(dbPath)) {
  chmodSync(dbPath, 0o666);
} else {
  console.log("first");
}

process.env.DATABASE_URL = `file:${dbPath}`;

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(
        app.getAppPath(),
        "dist-electron",
        "electron",
        "preload.cjs"
      ),
    },
    minHeight: 720,
    minWidth: 1280,
  });

  mainWindow.maximize();

  if (app.isPackaged) {
    mainWindow.loadFile(
      path.join(app.getAppPath(), "dist-react", "index.html")
    );
  } else {
    mainWindow.loadURL("http://localhost:5173");
  }
});

const prisma = new PrismaClient();

ipcMain.handle("get-students", async () => {
  const students = prisma.student.findMany({
    include: {
      course: true,
    },
  });
  return students;
});

ipcMain.handle("get-student", async (_event, id: number) => {
  const student = await prisma.student.findUnique({
    where: {
      id,
    },
    include: {
      course: true,
    },
  });

  return student;
});

ipcMain.handle("create-student", async (_event, student: ZodStudent) => {
  await prisma.student.upsert({
    create: {
      ...student,
      sex: student.sex as Sex,
    },
    update: {
      ...student,
    },
    where: {
      id: student.id || -1,
    },
  });

  return { success: true };
});

ipcMain.handle("get-courses", async () => {
  const courses = await prisma.course.findMany({
    include: {
      competencies: true,
      students: true,
    },
  });

  return courses;
});

ipcMain.handle("delete-student", async (_event, id: number) => {
  console.log(id);
  await prisma.student.delete({
    where: {
      id,
    },
  });

  return { success: true };
});
