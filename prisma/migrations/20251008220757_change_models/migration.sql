/*
  Warnings:

  - You are about to drop the column `entityType` on the `agt` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_agt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nif" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'SINGULAR',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_agt" ("createdAt", "id", "name", "nif", "updateAt") SELECT "createdAt", "id", "name", "nif", "updateAt" FROM "agt";
DROP TABLE "agt";
ALTER TABLE "new_agt" RENAME TO "agt";
CREATE UNIQUE INDEX "agt_nif_key" ON "agt"("nif");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
