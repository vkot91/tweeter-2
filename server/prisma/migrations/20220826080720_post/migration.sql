-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
