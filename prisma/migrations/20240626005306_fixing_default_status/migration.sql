-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SelfAssessment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "cycleId" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "date" DATETIME NOT NULL,
    "meanGrade" REAL NOT NULL,
    CONSTRAINT "SelfAssessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SelfAssessment_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "Cycle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SelfAssessment" ("cycleId", "date", "id", "meanGrade", "status", "userId") SELECT "cycleId", "date", "id", "meanGrade", "status", "userId" FROM "SelfAssessment";
DROP TABLE "SelfAssessment";
ALTER TABLE "new_SelfAssessment" RENAME TO "SelfAssessment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
