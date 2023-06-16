-- CreateEnum
CREATE TYPE "StatusSchedule" AS ENUM ('COMPLETED', 'UPCOMING');

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "status" "StatusSchedule";
