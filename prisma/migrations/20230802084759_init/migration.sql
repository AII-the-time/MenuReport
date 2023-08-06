/*
  Warnings:

  - You are about to drop the column `uid` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_uid_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `uid`,
    ADD COLUMN `uuid` VARCHAR(191) NOT NULL,
    MODIFY `data` JSON NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_uuid_key` ON `User`(`uuid`);
