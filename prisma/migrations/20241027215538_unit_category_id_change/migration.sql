/*
  Warnings:

  - The primary key for the `unit_categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `unit_category_id` on the `unit_categories` table. The data in that column could be lost. The data in that column will be cast from `VarChar(7)` to `VarChar(6)`.
  - You are about to alter the column `unit_category_id` on the `units` table. The data in that column could be lost. The data in that column will be cast from `VarChar(7)` to `VarChar(6)`.

*/
-- DropForeignKey
ALTER TABLE `units` DROP FOREIGN KEY `Units_unit_category_id_fkey`;

-- AlterTable
ALTER TABLE `unit_categories` DROP PRIMARY KEY,
    MODIFY `unit_category_id` VARCHAR(6) NOT NULL,
    ADD PRIMARY KEY (`unit_category_id`);

-- AlterTable
ALTER TABLE `units` MODIFY `unit_category_id` VARCHAR(6) NOT NULL;

-- AddForeignKey
ALTER TABLE `Units` ADD CONSTRAINT `Units_unit_category_id_fkey` FOREIGN KEY (`unit_category_id`) REFERENCES `Unit_Categories`(`unit_category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
