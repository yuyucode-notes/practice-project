/*
  Warnings:

  - You are about to drop the `ariticletab` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `body` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cover` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `article` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `ariticletab` DROP FOREIGN KEY `ariticletab_ibfk_1`;

-- AlterTable
ALTER TABLE `article` ADD COLUMN `body` TEXT NOT NULL,
    ADD COLUMN `brower` INTEGER DEFAULT 0,
    ADD COLUMN `cover` VARCHAR(191) NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `like` INTEGER DEFAULT 0,
    ADD COLUMN `published` BOOLEAN DEFAULT false,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `title` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `ariticletab`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191),
    `role` ENUM('USER', 'ADMIN', 'SUPERADMIN') DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User.id_unique`(`id`),
    UNIQUE INDEX `User.email_unique`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Info` (
    `userId` INTEGER NOT NULL,
    `age` INTEGER,
    `sex` ENUM('MALE', 'FAMALE') DEFAULT 'MALE',
    `address` VARCHAR(191),
    `phone` INTEGER,
    `job` VARCHAR(191),

    UNIQUE INDEX `Info.userId_unique`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArticleTab` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `articleId` INTEGER NOT NULL,
    `name` ENUM('Not', 'Html', 'Css', 'Javascript', 'Typescript', 'ECMAScript', 'Nodejs', 'Vue', 'React', 'Git') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShareCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `src` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `describe` VARCHAR(191) NOT NULL,
    `look` INTEGER DEFAULT 0,
    `like` INTEGER DEFAULT 0,
    `published` BOOLEAN DEFAULT false,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Info` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Article` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArticleTab` ADD FOREIGN KEY (`articleId`) REFERENCES `Article`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ShareCard` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
