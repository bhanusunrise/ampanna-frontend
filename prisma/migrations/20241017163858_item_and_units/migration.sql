-- CreateTable
CREATE TABLE `ItemUnit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` VARCHAR(10) NOT NULL,
    `unit_id` VARCHAR(7) NOT NULL,

    UNIQUE INDEX `ItemUnit_item_id_unit_id_key`(`item_id`, `unit_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ItemUnit` ADD CONSTRAINT `ItemUnit_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Items`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItemUnit` ADD CONSTRAINT `ItemUnit_unit_id_fkey` FOREIGN KEY (`unit_id`) REFERENCES `Unit`(`unit_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
