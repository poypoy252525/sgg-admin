import { BrowserWindow, app, ipcMain } from "electron";
import path from "path";
import { PrismaClient } from "../../generated/prisma/index.js";
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
  });

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
  const students = prisma.student.findMany();
  return students;
});

ipcMain.handle("create-student", async (_event, student: ZodStudent) => {
  await prisma.student.create({
    data: {
      ...student,
      image: undefined,
    },
  });
});
