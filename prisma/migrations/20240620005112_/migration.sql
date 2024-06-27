/*
  Warnings:

  - You are about to drop the column `justification` on the `EqualizationScore` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EqualizationScore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "equalizationId" INTEGER NOT NULL,
    "criterionId" INTEGER NOT NULL,
    "grade" REAL NOT NULL,
    CONSTRAINT "EqualizationScore_equalizationId_fkey" FOREIGN KEY ("equalizationId") REFERENCES "Equalization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EqualizationScore_criterionId_fkey" FOREIGN KEY ("criterionId") REFERENCES "Criterion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EqualizationScore" ("criterionId", "equalizationId", "grade", "id") SELECT "criterionId", "equalizationId", "grade", "id" FROM "EqualizationScore";
DROP TABLE "EqualizationScore";
ALTER TABLE "new_EqualizationScore" RENAME TO "EqualizationScore";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
