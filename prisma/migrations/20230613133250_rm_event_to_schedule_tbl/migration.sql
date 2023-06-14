/*
  Warnings:

  - You are about to drop the column `name` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `Team` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `TimeTableEvent` table. All the data in the column will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endDate` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgCountry` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgEvent` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeName` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_eventId_fkey";

-- DropForeignKey
ALTER TABLE "TimeTableEvent" DROP CONSTRAINT "TimeTableEvent_eventId_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "name",
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "imgCountry" TEXT NOT NULL,
ADD COLUMN     "imgEvent" TEXT NOT NULL,
ADD COLUMN     "placeName" TEXT NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" DROP COLUMN "eventId",
ADD COLUMN     "scheduleId" INTEGER;

-- AlterTable
ALTER TABLE "TimeTableEvent" DROP COLUMN "eventId",
ADD COLUMN     "scheduleId" INTEGER;

-- DropTable
DROP TABLE "Event";

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTableEvent" ADD CONSTRAINT "TimeTableEvent_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
