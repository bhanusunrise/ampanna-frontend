/*
  Warnings:

  - Added the required column `updatedAt` to the `Bills` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BillStocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Item_Categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ItemUnits` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Returned_Items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Stocks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Suppliers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Unit_Categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Unit_Conversions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Units` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bills` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `billstocks` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `item_categories` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `items` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `itemunits` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `returned_items` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `stocks` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `suppliers` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `unit_categories` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `unit_conversions` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `units` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
