-- CreateTable
CREATE TABLE `ItemUnits` (
    `item_id` VARCHAR(191) NOT NULL,
    `unit_id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`item_id`, `unit_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ItemUnits` ADD CONSTRAINT `ItemUnits_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Items`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemUnits` ADD CONSTRAINT `ItemUnits_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `Units`(`unit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
