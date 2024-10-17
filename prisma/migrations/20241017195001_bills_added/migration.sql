-- CreateTable
CREATE TABLE `Bills` (
    `bill_id` INTEGER NOT NULL AUTO_INCREMENT,
    `bill_date` DATE NOT NULL,
    `barcode_url` VARCHAR(20) NOT NULL,
    `sub_total_amount` DOUBLE NOT NULL,
    `discount_amount` DOUBLE NOT NULL,
    `returned_amount` DOUBLE NOT NULL,

    PRIMARY KEY (`bill_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BillStocks` (
    `bill_id` INTEGER NOT NULL,
    `stock_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`bill_id`, `stock_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BillStocks` ADD CONSTRAINT `BillStocks_bill_id_fkey` FOREIGN KEY (`bill_id`) REFERENCES `Bills`(`bill_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `BillStocks` ADD CONSTRAINT `BillStocks_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `Stocks`(`stock_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
