/*
  Warnings:

  - You are about to drop the column `time` on the `TimeTableEvent` table. All the data in the column will be lost.
  - Added the required column `date` to the `TimeTableEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `TimeTableEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimeTableEvent" DROP COLUMN "time",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "month" TEXT NOT NULL;
