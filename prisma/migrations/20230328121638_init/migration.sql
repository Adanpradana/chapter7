/*
  Warnings:

  - The `Result` column on the `GameRoom` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "GameRoom" ALTER COLUMN "player_one" DROP NOT NULL,
ALTER COLUMN "player_two" DROP NOT NULL,
ALTER COLUMN "winner" DROP NOT NULL,
ALTER COLUMN "room" DROP NOT NULL,
DROP COLUMN "Result",
ADD COLUMN     "Result" TEXT[],
ALTER COLUMN "times" DROP NOT NULL;
