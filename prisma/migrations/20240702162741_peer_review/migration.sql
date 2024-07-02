-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PeerReview" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "evaluatorId" INTEGER NOT NULL,
    "evaluatedId" INTEGER NOT NULL,
    "cycleId" INTEGER NOT NULL,
    "meanGrade" REAL NOT NULL,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "PeerReview_evaluatorId_fkey" FOREIGN KEY ("evaluatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PeerReview_evaluatedId_fkey" FOREIGN KEY ("evaluatedId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PeerReview_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "Cycle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PeerReview" ("cycleId", "evaluatedId", "evaluatorId", "id", "meanGrade") SELECT "cycleId", "evaluatedId", "evaluatorId", "id", "meanGrade" FROM "PeerReview";
DROP TABLE "PeerReview";
ALTER TABLE "new_PeerReview" RENAME TO "PeerReview";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
