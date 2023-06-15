/*
  Warnings:

  - The primary key for the `Driver` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `EventResult` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Schedule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TeamProfile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TimeTableEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Video` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_teamId_fkey";

-- DropForeignKey
ALTER TABLE "EventResult" DROP CONSTRAINT "EventResult_timeTableEventId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_scheduleId_fkey";

-- DropForeignKey
ALTER TABLE "TeamProfile" DROP CONSTRAINT "TeamProfile_teamId_fkey";

-- DropForeignKey
ALTER TABLE "TimeTableEvent" DROP CONSTRAINT "TimeTableEvent_scheduleId_fkey";

-- AlterTable
ALTER TABLE "Driver" DROP CONSTRAINT "Driver_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "teamId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Driver_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Driver_id_seq";

-- AlterTable
ALTER TABLE "EventResult" DROP CONSTRAINT "EventResult_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "timeTableEventId" SET DATA TYPE TEXT,
ADD CONSTRAINT "EventResult_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "EventResult_id_seq";

-- AlterTable
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Schedule_id_seq";

-- AlterTable
ALTER TABLE "Team" DROP CONSTRAINT "Team_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "scheduleId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Team_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Team_id_seq";

-- AlterTable
ALTER TABLE "TeamProfile" DROP CONSTRAINT "TeamProfile_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "teamId" SET DATA TYPE TEXT,
ADD CONSTRAINT "TeamProfile_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TeamProfile_id_seq";

-- AlterTable
ALTER TABLE "TimeTableEvent" DROP CONSTRAINT "TimeTableEvent_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "scheduleId" SET DATA TYPE TEXT,
ADD CONSTRAINT "TimeTableEvent_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "TimeTableEvent_id_seq";

-- AlterTable
ALTER TABLE "Video" DROP CONSTRAINT "Video_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Video_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Video_id_seq";

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamProfile" ADD CONSTRAINT "TeamProfile_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTableEvent" ADD CONSTRAINT "TimeTableEvent_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventResult" ADD CONSTRAINT "EventResult_timeTableEventId_fkey" FOREIGN KEY ("timeTableEventId") REFERENCES "TimeTableEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
