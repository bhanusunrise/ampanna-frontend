/*
  Warnings:

  - You are about to drop the column `quantity` on the `stocks` table. All the data in the column will be lost.
  - Added the required column `damaged_quantity` to the `Stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sold_quantity` to the `Stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_quantity` to the `Stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stocks` DROP COLUMN `quantity`,
    ADD COLUMN `damaged_quantity` INTEGER NOT NULL,
    ADD COLUMN `sold_quantity` INTEGER NOT NULL,
    ADD COLUMN `total_quantity` INTEGER NOT NULL;
