-- AlterTable
ALTER TABLE "User" ADD COLUMN "address" TEXT;
ALTER TABLE "User" ADD COLUMN "position" TEXT;

-- CreateTable
CREATE TABLE "Criterion" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SelfAssessment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "cycleId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "meanGrade" REAL NOT NULL,
    CONSTRAINT "SelfAssessment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SelfAssessment_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "Cycle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SelfAssessmentScore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "selfAssessmentId" INTEGER NOT NULL,
    "criterionId" INTEGER NOT NULL,
    "grade" REAL NOT NULL,
    "justification" TEXT NOT NULL,
    CONSTRAINT "SelfAssessmentScore_selfAssessmentId_fkey" FOREIGN KEY ("selfAssessmentId") REFERENCES "SelfAssessment" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SelfAssessmentScore_criterionId_fkey" FOREIGN KEY ("criterionId") REFERENCES "Criterion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Cycle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PeerReview" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "evaluatorId" INTEGER NOT NULL,
    "evaluatedId" INTEGER NOT NULL,
    "cycleId" INTEGER NOT NULL,
    "meanGrade" REAL NOT NULL,
    CONSTRAINT "PeerReview_evaluatorId_fkey" FOREIGN KEY ("evaluatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PeerReview_evaluatedId_fkey" FOREIGN KEY ("evaluatedId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PeerReview_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "Cycle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PeerReviewScore" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "assessmentId" INTEGER NOT NULL,
    "criterionId" INTEGER NOT NULL,
    "grade" REAL NOT NULL,
    "justification" TEXT NOT NULL,
    CONSTRAINT "PeerReviewScore_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "PeerReview" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PeerReviewScore_criterionId_fkey" FOREIGN KEY ("criterionId") REFERENCES "Criterion" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Equalization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "evaluatorId" INTEGER NOT NULL,
    "evaluatedId" INTEGER NOT NULL,
    "cycleId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "finalGrade" REAL NOT NULL,
    CONSTRAINT "Equalization_evaluatorId_fkey" FOREIGN KEY ("evaluatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Equalization_evaluatedId_fkey" FOREIGN KEY ("evaluatedId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Equalization_cycleId_fkey" FOREIGN KEY ("cycleId") REFERENCES "Cycle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
