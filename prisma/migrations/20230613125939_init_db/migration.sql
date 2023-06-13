-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fullTeamName" TEXT NOT NULL,
    "base" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "teamChief" TEXT NOT NULL,
    "technicalChief" TEXT NOT NULL,
    "chassis" TEXT NOT NULL,
    "powerUnit" TEXT NOT NULL,
    "firstTeamEntry" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "worldChampionships" TEXT NOT NULL,
    "highestRaceFinish" TEXT NOT NULL,
    "polePositions" TEXT NOT NULL,
    "fastestLaps" TEXT NOT NULL,
    "imgLogo" TEXT NOT NULL,
    "imgTeamCar" TEXT NOT NULL,
    "imgBrandLogo" TEXT NOT NULL,
    "eventId" INTEGER,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rank" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "podiums" TEXT NOT NULL,
    "grandsPrixEntered" TEXT NOT NULL,
    "worldChampionships" TEXT NOT NULL,
    "highestRaceFinish" TEXT NOT NULL,
    "highestGridPosition" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "imgCountry" TEXT NOT NULL,
    "imgDriver" TEXT NOT NULL,
    "imgNumber" TEXT NOT NULL,
    "biography" TEXT NOT NULL,
    "teamId" INTEGER,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamProfile" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "descriptionOfYear" TEXT NOT NULL,
    "teamId" INTEGER,

    CONSTRAINT "TeamProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "placeName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imgCountry" TEXT NOT NULL,
    "imgEvent" TEXT NOT NULL,
    "scheduleId" INTEGER,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeTableEvent" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "eventId" INTEGER,

    CONSTRAINT "TimeTableEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventResult" (
    "id" SERIAL NOT NULL,
    "time" TEXT NOT NULL,
    "gap" TEXT NOT NULL,
    "laps" TEXT NOT NULL,
    "timeTableEventId" INTEGER,

    CONSTRAINT "EventResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "length" TEXT NOT NULL,
    "urlVideo" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamProfile" ADD CONSTRAINT "TeamProfile_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeTableEvent" ADD CONSTRAINT "TimeTableEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventResult" ADD CONSTRAINT "EventResult_timeTableEventId_fkey" FOREIGN KEY ("timeTableEventId") REFERENCES "TimeTableEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
