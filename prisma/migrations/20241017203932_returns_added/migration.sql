/*
  Warnings:

  - The primary key for the `bills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `billstocks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `stocks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `suppliers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `billstocks` DROP FOREIGN KEY `BillStocks_bill_id_fkey`;

-- DropForeignKey
ALTER TABLE `billstocks` DROP FOREIGN KEY `BillStocks_stock_id_fkey`;

-- DropForeignKey
ALTER TABLE `stocks` DROP FOREIGN KEY `Stocks_supplier_id_fkey`;

-- AlterTable
ALTER TABLE `bills` DROP PRIMARY KEY,
    MODIFY `bill_id` VARCHAR(10) NOT NULL,
    ADD PRIMARY KEY (`bill_id`);

-- AlterTable
ALTER TABLE `billstocks` DROP PRIMARY KEY,
    MODIFY `bill_id` VARCHAR(191) NOT NULL,
    MODIFY `stock_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`bill_id`, `stock_id`);

-- AlterTable
ALTER TABLE `stocks` DROP PRIMARY KEY,
    MODIFY `stock_id` VARCHAR(10) NOT NULL,
    MODIFY `supplier_id` VARCHAR(8) NOT NULL,
    ADD PRIMARY KEY (`stock_id`);

-- AlterTable
ALTER TABLE `suppliers` DROP PRIMARY KEY,
    MODIFY `supplier_id` VARCHAR(8) NOT NULL,
    ADD PRIMARY KEY (`supplier_id`);

-- CreateTable
CREATE TABLE `Returned_Items` (
    `returned_id` VARCHAR(10) NOT NULL,
    `returned_date` DATE NOT NULL,
    `returned_quantity` INTEGER NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `bill_id` VARCHAR(191) NOT NULL,
    `stock_id` VARCHAR(191) NOT NULL,

    INDEX `Returned_Items_bill_id_idx`(`bill_id`),
    INDEX `Returned_Items_stock_id_idx`(`stock_id`),
    PRIMARY KEY (`returned_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Stocks` ADD CONSTRAINT `Stocks_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `Suppliers`(`supplier_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillStocks` ADD CONSTRAINT `BillStocks_bill_id_fkey` FOREIGN KEY (`bill_id`) REFERENCES `Bills`(`bill_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillStocks` ADD CONSTRAINT `BillStocks_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `Stocks`(`stock_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Returned_Items` ADD CONSTRAINT `Returned_Items_bill_id_fkey` FOREIGN KEY (`bill_id`) REFERENCES `Bills`(`bill_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Returned_Items` ADD CONSTRAINT `Returned_Items_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `Stocks`(`stock_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
