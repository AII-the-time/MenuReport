-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `data` JSON NOT NULL,

    UNIQUE INDEX `User_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;