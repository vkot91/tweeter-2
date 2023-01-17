-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'BLOCKED';

-- AlterTable
ALTER TABLE "Friends" ADD COLUMN     "attemptsCount" INTEGER NOT NULL DEFAULT 1;
