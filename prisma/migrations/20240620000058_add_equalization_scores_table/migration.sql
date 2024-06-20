-- CreateTable
CREATE TABLE "EqualizationScore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "equalizationId" INTEGER NOT NULL,
    "criterionId" INTEGER NOT NULL,
    "grade" REAL NOT NULL,
    "justification" TEXT NOT NULL,
    CONSTRAINT "EqualizationScore_equalizationId_fkey" FOREIGN KEY ("equalizationId") REFERENCES "Equalization" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "EqualizationScore_criterionId_fkey" FOREIGN KEY ("criterionId") REFERENCES "Criterion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
