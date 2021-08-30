-- CreateTable
CREATE TABLE `ArticleTabList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('Not', 'Html', 'Css', 'Javascript', 'Typescript', 'ECMAScript', 'Nodejs', 'Vue', 'React', 'Git') NOT NULL,

    UNIQUE INDEX `ArticleTabList.name_unique`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
