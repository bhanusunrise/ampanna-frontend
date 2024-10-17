-- CreateTable
CREATE TABLE `Unit` (
    `unit_id` INTEGER NOT NULL AUTO_INCREMENT,
    `unit_name` VARCHAR(50) NOT NULL,
    `abbreviation` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`unit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conversion` (
    `conversion_id` INTEGER NOT NULL AUTO_INCREMENT,
    `from_unit_id` INTEGER NOT NULL,
    `to_unit_id` INTEGER NOT NULL,
    `conversion_rate` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`conversion_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HardwareItem` (
    `item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(191) NULL,
    `supplier_id` INTEGER NULL,
    `default_unit_id` INTEGER NULL,

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Conversion` ADD CONSTRAINT `Conversion_from_unit_id_fkey` FOREIGN KEY (`from_unit_id`) REFERENCES `Unit`(`unit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversion` ADD CONSTRAINT `Conversion_to_unit_id_fkey` FOREIGN KEY (`to_unit_id`) REFERENCES `Unit`(`unit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HardwareItem` ADD CONSTRAINT `HardwareItem_default_unit_id_fkey` FOREIGN KEY (`default_unit_id`) REFERENCES `Unit`(`unit_id`) ON DELETE SET NULL ON UPDATE CASCADE;
