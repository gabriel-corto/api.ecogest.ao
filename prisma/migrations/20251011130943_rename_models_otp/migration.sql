/*
  Warnings:

  - You are about to drop the column `otp_expires_at` on the `otp` table. All the data in the column will be lost.
  - Added the required column `expires_at` to the `otp` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_otp" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "otp" TEXT NOT NULL,
    "expires_at" DATETIME NOT NULL,
    "already_expired" BOOLEAN,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    CONSTRAINT "otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_otp" ("already_expired", "createdAt", "id", "otp", "updatedAt", "userId") SELECT "already_expired", "createdAt", "id", "otp", "updatedAt", "userId" FROM "otp";
DROP TABLE "otp";
ALTER TABLE "new_otp" RENAME TO "otp";
CREATE UNIQUE INDEX "otp_otp_key" ON "otp"("otp");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
