/*
  Warnings:

  - You are about to alter the column `status` on the `Equalization` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Equalization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "evaluatorId" INTEGER NOT NULL,
    "evaluatedId" INTEGER NOT NULL,
    "cycleId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "finalGrade" REAL NOT NULL,
    CONSTRAINT "Equalization_evaluatorId_fkey" FOREIGN KEY ("evaluatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Equalization_evaluatedId_fkey" FOREIGN KEY ("evaluatedId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Equalization_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "Cycle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Equalization" ("cycleId", "date", "evaluatedId", "evaluatorId", "finalGrade", "id", "status") SELECT "cycleId", "date", "evaluatedId", "evaluatorId", "finalGrade", "id", "status" FROM "Equalization";
DROP TABLE "Equalization";
ALTER TABLE "new_Equalization" RENAME TO "Equalization";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
