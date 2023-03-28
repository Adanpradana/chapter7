-- CreateTable
CREATE TABLE "GameRoom" (
    "id" TEXT NOT NULL,
    "player_one" TEXT NOT NULL,
    "player_two" TEXT NOT NULL,
    "timies" TEXT NOT NULL,
    "winner" TEXT NOT NULL,
    "room" TEXT NOT NULL,
    "Result" TEXT NOT NULL,

    CONSTRAINT "GameRoom_pkey" PRIMARY KEY ("id")
);
