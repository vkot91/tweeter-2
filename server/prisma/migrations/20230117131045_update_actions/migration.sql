-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "checked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Like" ADD COLUMN     "checked" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Share" ADD COLUMN     "checked" BOOLEAN NOT NULL DEFAULT false;
