/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `PixKeys` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PixKeys_key_key" ON "PixKeys"("key");
