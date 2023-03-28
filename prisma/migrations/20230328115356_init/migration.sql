/*
  Warnings:

  - You are about to drop the column `timies` on the `GameRoom` table. All the data in the column will be lost.
  - Added the required column `times` to the `GameRoom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameRoom" DROP COLUMN "timies",
ADD COLUMN     "times" TEXT NOT NULL;
