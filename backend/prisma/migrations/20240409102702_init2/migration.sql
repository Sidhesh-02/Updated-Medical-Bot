/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "accesstoken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "loginsession" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "loginsession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page" (
    "sourceid" INTEGER NOT NULL,
    "response" TEXT NOT NULL,
    "finalQuestion" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "page_sourceid_key" ON "page"("sourceid");
