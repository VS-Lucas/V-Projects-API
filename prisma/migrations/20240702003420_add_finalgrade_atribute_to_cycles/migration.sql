-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cycle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "finalGrade" REAL NOT NULL DEFAULT 0.0
);
INSERT INTO "new_Cycle" ("endDate", "id", "name", "startDate", "status") SELECT "endDate", "id", "name", "startDate", "status" FROM "Cycle";
DROP TABLE "Cycle";
ALTER TABLE "new_Cycle" RENAME TO "Cycle";
CREATE TABLE "new_CycleEqualization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "finalGrade" REAL NOT NULL DEFAULT 0.0
);
INSERT INTO "new_CycleEqualization" ("endDate", "id", "name", "startDate", "status") SELECT "endDate", "id", "name", "startDate", "status" FROM "CycleEqualization";
DROP TABLE "CycleEqualization";
ALTER TABLE "new_CycleEqualization" RENAME TO "CycleEqualization";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
