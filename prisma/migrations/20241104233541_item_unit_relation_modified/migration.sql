-- AlterTable
ALTER TABLE `itemunits` ADD COLUMN `default_status` VARCHAR(191) NOT NULL DEFAULT 'අවශ්‍ය',
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'සක්‍රීය';
