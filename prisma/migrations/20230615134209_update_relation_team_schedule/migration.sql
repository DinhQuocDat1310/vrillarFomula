/*
  Warnings:

  - You are about to drop the column `scheduleId` on the `Team` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_scheduleId_fkey";

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "scheduleId";

-- CreateTable
CREATE TABLE "_ScheduleToTeam" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ScheduleToTeam_AB_unique" ON "_ScheduleToTeam"("A", "B");

-- CreateIndex
CREATE INDEX "_ScheduleToTeam_B_index" ON "_ScheduleToTeam"("B");

-- AddForeignKey
ALTER TABLE "_ScheduleToTeam" ADD CONSTRAINT "_ScheduleToTeam_A_fkey" FOREIGN KEY ("A") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ScheduleToTeam" ADD CONSTRAINT "_ScheduleToTeam_B_fkey" FOREIGN KEY ("B") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;
