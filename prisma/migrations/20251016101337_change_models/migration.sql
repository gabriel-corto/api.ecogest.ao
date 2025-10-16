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
    "userId" TEXT,
    CONSTRAINT "idoc_id_fkey" FOREIGN KEY ("id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_idoc" ("createdAt", "id", "status", "type", "updatedAt", "url", "userId") SELECT "createdAt", "id", "status", "type", "updatedAt", "url", "userId" FROM "idoc";
DROP TABLE "idoc";
ALTER TABLE "new_idoc" RENAME TO "idoc";
CREATE UNIQUE INDEX "idoc_userId_key" ON "idoc"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
