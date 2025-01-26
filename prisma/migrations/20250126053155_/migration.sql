/*
  Warnings:

  - Added the required column `dueAt` to the `ToDo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ToDo` ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `dueAt` DATETIME(3) NOT NULL;
