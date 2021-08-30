/*
  Warnings:

  - The primary key for the `ariticletab` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ariticletab` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[articleId]` on the table `AriticleTab` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `ariticletab` DROP PRIMARY KEY,
    DROP COLUMN `id`;

-- CreateIndex
CREATE UNIQUE INDEX `AriticleTab.articleId_unique` ON `AriticleTab`(`articleId`);
