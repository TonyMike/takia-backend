/*
  Warnings:

  - Changed the type of `condition` on the `Product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Condition" AS ENUM ('new', 'used');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "condition",
ADD COLUMN     "condition" "Condition" NOT NULL;
