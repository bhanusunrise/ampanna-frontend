/*
  Warnings:

  - You are about to drop the `item_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itemunit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stock` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `unit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `Items_item_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `itemunit` DROP FOREIGN KEY `ItemUnit_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `itemunit` DROP FOREIGN KEY `ItemUnit_unit_id_fkey`;

-- DropForeignKey
ALTER TABLE `stock` DROP FOREIGN KEY `Stock_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `unit_conversions` DROP FOREIGN KEY `Unit_Conversions_from_unit_fkey`;

-- DropForeignKey
ALTER TABLE `unit_conversions` DROP FOREIGN KEY `Unit_Conversions_to_unit_fkey`;

-- DropTable
DROP TABLE `item_category`;

-- DropTable
DROP TABLE `itemunit`;

-- DropTable
DROP TABLE `stock`;

-- DropTable
DROP TABLE `unit`;

-- CreateTable
CREATE TABLE `Units` (
    `unit_id` VARCHAR(7) NOT NULL,
    `unit_name` VARCHAR(50) NOT NULL,
    `abbreviation` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`unit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item_Categories` (
    `category_id` VARCHAR(6) NOT NULL,
    `category_name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ItemUnits` (
    `id` VARCHAR(6) NOT NULL,
    `item_id` VARCHAR(10) NOT NULL,
    `unit_id` VARCHAR(7) NOT NULL,

    UNIQUE INDEX `ItemUnits_item_id_unit_id_key`(`item_id`, `unit_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stocks` (
    `stock_id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `item_id` VARCHAR(10) NOT NULL,
    `buying_price` DOUBLE NOT NULL,
    `selling_price` DOUBLE NOT NULL,

    PRIMARY KEY (`stock_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Unit_Conversions` ADD CONSTRAINT `Unit_Conversions_from_unit_fkey` FOREIGN KEY (`from_unit`) REFERENCES `Units`(`unit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unit_Conversions` ADD CONSTRAINT `Unit_Conversions_to_unit_fkey` FOREIGN KEY (`to_unit`) REFERENCES `Units`(`unit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_item_category_id_fkey` FOREIGN KEY (`item_category_id`) REFERENCES `Item_Categories`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemUnits` ADD CONSTRAINT `ItemUnits_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Items`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemUnits` ADD CONSTRAINT `ItemUnits_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `Units`(`unit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stocks` ADD CONSTRAINT `Stocks_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Items`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
