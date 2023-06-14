/*
  Warnings:

  - Added the required column `month` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "month" TEXT NOT NULL,
ALTER COLUMN "endDate" SET DATA TYPE TEXT,
ALTER COLUMN "startDate" SET DATA TYPE TEXT;
