/*
  Warnings:

  - Added the required column `supplier_id` to the `Stocks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stocks` ADD COLUMN `supplier_id` VARCHAR(7) NOT NULL;

-- CreateTable
CREATE TABLE `Suppliers` (
    `supplier_id` VARCHAR(7) NOT NULL,
    `supplier_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` INTEGER NOT NULL,
    `address` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`supplier_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Stocks` ADD CONSTRAINT `Stocks_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `Suppliers`(`supplier_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
