/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `SubCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "image" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_name_key" ON "SubCategory"("name");
