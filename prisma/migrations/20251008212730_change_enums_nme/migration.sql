/*
  Warnings:

  - You are about to drop the column `userId` on the `idoc` table. All the data in the column will be lost.
  - Added the required column `entityId` to the `idoc` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_idoc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "idoc_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_idoc" ("createdAt", "id", "status", "type", "updatedAt", "url") SELECT "createdAt", "id", "status", "type", "updatedAt", "url" FROM "idoc";
DROP TABLE "idoc";
ALTER TABLE "new_idoc" RENAME TO "idoc";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
