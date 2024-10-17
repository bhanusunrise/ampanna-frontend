/*
  Warnings:

  - Added the required column `buying_date` to the `Stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stocks` ADD COLUMN `buying_date` DATE NOT NULL;
