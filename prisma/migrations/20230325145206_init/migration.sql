-- CreateTable
CREATE TABLE "userGame" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "userGame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userGameBiodata" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "userGameId" TEXT NOT NULL,

    CONSTRAINT "userGameBiodata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userGame_username_key" ON "userGame"("username");

-- CreateIndex
CREATE UNIQUE INDEX "userGame_password_key" ON "userGame"("password");

-- CreateIndex
CREATE UNIQUE INDEX "userGameBiodata_name_key" ON "userGameBiodata"("name");

-- CreateIndex
CREATE UNIQUE INDEX "userGameBiodata_userGameId_key" ON "userGameBiodata"("userGameId");

-- AddForeignKey
ALTER TABLE "userGameBiodata" ADD CONSTRAINT "userGameBiodata_userGameId_fkey" FOREIGN KEY ("userGameId") REFERENCES "userGame"("id") ON DELETE CASCADE ON UPDATE CASCADE;
