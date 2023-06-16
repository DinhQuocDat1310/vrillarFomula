/*
  Warnings:

  - Added the required column `car` to the `EventResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driver` to the `EventResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no` to the `EventResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pos` to the `EventResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EventResult" ADD COLUMN     "car" TEXT NOT NULL,
ADD COLUMN     "driver" TEXT NOT NULL,
ADD COLUMN     "no" TEXT NOT NULL,
ADD COLUMN     "points" TEXT,
ADD COLUMN     "pos" TEXT NOT NULL,
ADD COLUMN     "q1" TEXT,
ADD COLUMN     "q2" TEXT,
ADD COLUMN     "q3" TEXT,
ADD COLUMN     "timeRetired" TEXT,
ALTER COLUMN "time" DROP NOT NULL,
ALTER COLUMN "gap" DROP NOT NULL,
ALTER COLUMN "laps" DROP NOT NULL;
