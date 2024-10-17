/*
  Warnings:

  - The primary key for the `unit` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `unit` DROP PRIMARY KEY,
    MODIFY `unit_id` VARCHAR(7) NOT NULL,
    ADD PRIMARY KEY (`unit_id`);
