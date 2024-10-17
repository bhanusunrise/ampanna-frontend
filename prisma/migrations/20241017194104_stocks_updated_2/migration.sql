/*
  Warnings:

  - Added the required column `barcode_url` to the `Stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stocks` ADD COLUMN `barcode_url` VARCHAR(20) NOT NULL;
