/*
  Warnings:

  - You are about to drop the column `entityId` on the `idoc` table. All the data in the column will be lost.
  - Added the required column `userId` to the `idoc` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_idoc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "idoc_id_fkey" FOREIGN KEY ("id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_idoc" ("createdAt", "id", "status", "type", "updatedAt", "url") SELECT "createdAt", "id", "status", "type", "updatedAt", "url" FROM "idoc";
DROP TABLE "idoc";
ALTER TABLE "new_idoc" RENAME TO "idoc";
CREATE UNIQUE INDEX "idoc_userId_key" ON "idoc"("userId");
CREATE TABLE "new_otp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "otp" TEXT NOT NULL,
    "expires_at" DATETIME NOT NULL,
    "already_expired" BOOLEAN,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "otp_id_fkey" FOREIGN KEY ("id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_otp" ("already_expired", "createdAt", "expires_at", "id", "otp", "updatedAt", "userId") SELECT "already_expired", "createdAt", "expires_at", "id", "otp", "updatedAt", "userId" FROM "otp";
DROP TABLE "otp";
ALTER TABLE "new_otp" RENAME TO "otp";
CREATE UNIQUE INDEX "otp_otp_key" ON "otp"("otp");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
