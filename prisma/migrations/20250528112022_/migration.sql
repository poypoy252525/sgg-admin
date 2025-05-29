/*
  Warnings:

  - Added the required column `type` to the `Competency` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Competency" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "courseId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    CONSTRAINT "Competency_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Competency" ("courseId", "createdAt", "duration", "id", "name", "updatedAt") SELECT "courseId", "createdAt", "duration", "id", "name", "updatedAt" FROM "Competency";
DROP TABLE "Competency";
ALTER TABLE "new_Competency" RENAME TO "Competency";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
