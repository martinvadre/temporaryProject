-- CreateTable
CREATE TABLE `Event` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `start` DATETIME(3) NOT NULL,
    `end` DATETIME(3) NOT NULL,
    `allDay` BOOLEAN NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `calendarId` VARCHAR(191) NOT NULL,

    INDEX `Event_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
