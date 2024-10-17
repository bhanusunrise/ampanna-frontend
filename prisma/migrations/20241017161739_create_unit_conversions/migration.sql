-- CreateTable
CREATE TABLE `Unit_Conversions` (
    `conversion_id` VARCHAR(8) NOT NULL,
    `from_unit` VARCHAR(10) NOT NULL,
    `value` DOUBLE NOT NULL,
    `to_unit` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`conversion_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Unit_Conversions` ADD CONSTRAINT `Unit_Conversions_from_unit_fkey` FOREIGN KEY (`from_unit`) REFERENCES `Unit`(`unit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unit_Conversions` ADD CONSTRAINT `Unit_Conversions_to_unit_fkey` FOREIGN KEY (`to_unit`) REFERENCES `Unit`(`unit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
