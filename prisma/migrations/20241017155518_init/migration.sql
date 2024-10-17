/*
  Warnings:

  - You are about to drop the `conversion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hardwareitem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `conversion` DROP FOREIGN KEY `Conversion_from_unit_id_fkey`;

-- DropForeignKey
ALTER TABLE `conversion` DROP FOREIGN KEY `Conversion_to_unit_id_fkey`;

-- DropForeignKey
ALTER TABLE `hardwareitem` DROP FOREIGN KEY `HardwareItem_default_unit_id_fkey`;

-- DropTable
DROP TABLE `conversion`;

-- DropTable
DROP TABLE `hardwareitem`;
