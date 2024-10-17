-- CreateTable
CREATE TABLE `Items` (
    `item_id` VARCHAR(10) NOT NULL,
    `item_name` VARCHAR(50) NOT NULL,
    `item_category_id` VARCHAR(6) NOT NULL,

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item_Category` (
    `category_id` VARCHAR(6) NOT NULL,
    `category_name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_item_category_id_fkey` FOREIGN KEY (`item_category_id`) REFERENCES `Item_Category`(`category_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
