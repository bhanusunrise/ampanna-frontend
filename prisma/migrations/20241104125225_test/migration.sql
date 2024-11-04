-- CreateTable
CREATE TABLE `Unit_Categories` (
    `unit_category_id` VARCHAR(6) NOT NULL,
    `unit_category_name` VARCHAR(10) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'සක්‍රීය',
    `default_status` VARCHAR(12) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`unit_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemCategoryUnit` (
    `id` VARCHAR(36) NOT NULL,
    `item_category_id` VARCHAR(6) NOT NULL,
    `unit_id` VARCHAR(7) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `ItemCategoryUnit_item_category_id_unit_id_key`(`item_category_id`, `unit_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Units` (
    `unit_id` VARCHAR(7) NOT NULL,
    `unit_name` VARCHAR(50) NOT NULL,
    `abbreviation` VARCHAR(10) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'සක්‍රීය',
    `unit_category_id` VARCHAR(6) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`unit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Unit_Conversions` (
    `conversion_id` VARCHAR(8) NOT NULL,
    `from_unit` VARCHAR(10) NOT NULL,
    `value` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'සක්‍රීය',
    `to_unit` VARCHAR(10) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`conversion_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Items` (
    `item_id` VARCHAR(10) NOT NULL,
    `item_name` VARCHAR(50) NOT NULL,
    `item_category_id` VARCHAR(6) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Items_item_category_id_idx`(`item_category_id`),
    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item_Categories` (
    `category_id` VARCHAR(6) NOT NULL,
    `category_name` VARCHAR(30) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stocks` (
    `stock_id` VARCHAR(10) NOT NULL,
    `total_quantity` INTEGER NOT NULL,
    `damaged_quantity` INTEGER NOT NULL,
    `sold_quantity` INTEGER NOT NULL,
    `item_id` VARCHAR(10) NOT NULL,
    `buying_date` DATE NOT NULL,
    `buying_price` DOUBLE NOT NULL,
    `selling_price` DOUBLE NOT NULL,
    `barcode_url` VARCHAR(20) NOT NULL,
    `supplier_id` VARCHAR(8) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Stocks_item_id_idx`(`item_id`),
    INDEX `Stocks_supplier_id_idx`(`supplier_id`),
    PRIMARY KEY (`stock_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Suppliers` (
    `supplier_id` VARCHAR(8) NOT NULL,
    `supplier_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` INTEGER NOT NULL,
    `address` VARCHAR(200) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Suppliers_supplier_id_idx`(`supplier_id`),
    PRIMARY KEY (`supplier_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bills` (
    `bill_id` VARCHAR(10) NOT NULL,
    `bill_date` DATE NOT NULL,
    `barcode_url` VARCHAR(20) NOT NULL,
    `sub_total_amount` DOUBLE NOT NULL,
    `discount_amount` DOUBLE NOT NULL,
    `returned_amount` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Bills_bill_date_idx`(`bill_date`),
    PRIMARY KEY (`bill_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BillStocks` (
    `bill_id` VARCHAR(191) NOT NULL,
    `stock_id` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`bill_id`, `stock_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Returned_Items` (
    `returned_id` VARCHAR(10) NOT NULL,
    `returned_date` DATE NOT NULL,
    `returned_quantity` INTEGER NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `bill_id` VARCHAR(191) NOT NULL,
    `stock_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Returned_Items_bill_id_idx`(`bill_id`),
    INDEX `Returned_Items_stock_id_idx`(`stock_id`),
    PRIMARY KEY (`returned_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CategoryUnitRelation` (
    `A` VARCHAR(36) NOT NULL,
    `B` VARCHAR(6) NOT NULL,

    UNIQUE INDEX `_CategoryUnitRelation_AB_unique`(`A`, `B`),
    INDEX `_CategoryUnitRelation_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ItemCategoryUnit` ADD CONSTRAINT `ItemCategoryUnit_item_category_id_fkey` FOREIGN KEY (`item_category_id`) REFERENCES `Item_Categories`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemCategoryUnit` ADD CONSTRAINT `ItemCategoryUnit_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `Units`(`unit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Units` ADD CONSTRAINT `Units_unit_category_id_fkey` FOREIGN KEY (`unit_category_id`) REFERENCES `Unit_Categories`(`unit_category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unit_Conversions` ADD CONSTRAINT `Unit_Conversions_from_unit_fkey` FOREIGN KEY (`from_unit`) REFERENCES `Units`(`unit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unit_Conversions` ADD CONSTRAINT `Unit_Conversions_to_unit_fkey` FOREIGN KEY (`to_unit`) REFERENCES `Units`(`unit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_item_category_id_fkey` FOREIGN KEY (`item_category_id`) REFERENCES `Item_Categories`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stocks` ADD CONSTRAINT `Stocks_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Items`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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

-- AddForeignKey
ALTER TABLE `_CategoryUnitRelation` ADD CONSTRAINT `_CategoryUnitRelation_A_fkey` FOREIGN KEY (`A`) REFERENCES `ItemCategoryUnit`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoryUnitRelation` ADD CONSTRAINT `_CategoryUnitRelation_B_fkey` FOREIGN KEY (`B`) REFERENCES `Item_Categories`(`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;
