/*
  Warnings:

  - You are about to drop the `identity_document` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `agt` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `otp` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "identity_document";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "idoc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "idoc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_agt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nif" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "entityType" TEXT NOT NULL DEFAULT 'SINGULAR',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_agt" ("createdAt", "entityType", "id", "name", "nif", "updateAt") SELECT "createdAt", "entityType", "id", "name", "nif", "updateAt" FROM "agt";
DROP TABLE "agt";
ALTER TABLE "new_agt" RENAME TO "agt";
CREATE UNIQUE INDEX "agt_nif_key" ON "agt"("nif");
CREATE TABLE "new_otp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "otp" TEXT NOT NULL,
    "otp_expires_at" DATETIME NOT NULL,
    "already_expired" BOOLEAN,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_otp" ("already_expired", "createdAt", "id", "otp", "otp_expires_at", "updatedAt", "userId") SELECT "already_expired", "createdAt", "id", "otp", "otp_expires_at", "updatedAt", "userId" FROM "otp";
DROP TABLE "otp";
ALTER TABLE "new_otp" RENAME TO "otp";
CREATE UNIQUE INDEX "otp_otp_key" ON "otp"("otp");
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "entityType" TEXT NOT NULL DEFAULT 'SINGULAR',
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "isIdentityVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("createdAt", "email", "entityType", "id", "isEmailVerified", "isIdentityVerified", "name", "nif", "password_hash", "updatedAt") SELECT "createdAt", "email", "entityType", "id", "isEmailVerified", "isIdentityVerified", "name", "nif", "password_hash", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_nif_key" ON "users"("nif");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
