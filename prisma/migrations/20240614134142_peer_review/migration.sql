/*
  Warnings:

  - You are about to drop the column `criterionId` on the `PeerReviewScore` table. All the data in the column will be lost.
  - You are about to drop the column `grade` on the `PeerReviewScore` table. All the data in the column will be lost.
  - You are about to drop the column `justification` on the `PeerReviewScore` table. All the data in the column will be lost.
  - Added the required column `behavior` to the `PeerReviewScore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tecniques` to the `PeerReviewScore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toImprove` to the `PeerReviewScore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toPraise` to the `PeerReviewScore` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PeerReviewScore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "assessmentId" INTEGER NOT NULL,
    "behavior" INTEGER NOT NULL,
    "tecniques" INTEGER NOT NULL,
    "toImprove" TEXT NOT NULL,
    "toPraise" TEXT NOT NULL,
    CONSTRAINT "PeerReviewScore_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "PeerReview" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PeerReviewScore" ("assessmentId", "id") SELECT "assessmentId", "id" FROM "PeerReviewScore";
DROP TABLE "PeerReviewScore";
ALTER TABLE "new_PeerReviewScore" RENAME TO "PeerReviewScore";
CREATE UNIQUE INDEX "PeerReviewScore_assessmentId_key" ON "PeerReviewScore"("assessmentId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
