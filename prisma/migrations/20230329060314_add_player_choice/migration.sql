/*
  Warnings:

  - You are about to drop the column `player_one_choics` on the `GameRoom` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GameRoom" DROP COLUMN "player_one_choics",
ADD COLUMN     "player_one_choice" TEXT[];
