/*
  Warnings:

  - You are about to drop the column `status` on the `SelfAssessment` table. All the data in the column will be lost.

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
    "status" TEXT NOT NULL DEFAULT 'Não finalizado',
    "finalGrade" REAL NOT NULL,
    CONSTRAINT "Equalization_evaluatorId_fkey" FOREIGN KEY ("evaluatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Equalization_evaluatedId_fkey" FOREIGN KEY ("evaluatedId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Equalization_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "Cycle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Equalization" ("cycleId", "date", "evaluatedId", "evaluatorId", "finalGrade", "id", "status") SELECT "cycleId", "date", "evaluatedId", "evaluatorId", "finalGrade", "id", "status" FROM "Equalization";
DROP TABLE "Equalization";
ALTER TABLE "new_Equalization" RENAME TO "Equalization";
CREATE TABLE "new_SelfAssessment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "cycleId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "meanGrade" REAL NOT NULL,
    CONSTRAINT "SelfAssessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SelfAssessment_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "Cycle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SelfAssessment" ("cycleId", "date", "id", "meanGrade", "userId") SELECT "cycleId", "date", "id", "meanGrade", "userId" FROM "SelfAssessment";
DROP TABLE "SelfAssessment";
ALTER TABLE "new_SelfAssessment" RENAME TO "SelfAssessment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
