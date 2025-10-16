-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nif" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "entityType" TEXT NOT NULL DEFAULT 'SINGULAR',
    "isEmailVerified" BOOLEAN DEFAULT false,
    "isIdentityVerified" BOOLEAN DEFAULT false,
    "role" TEXT NOT NULL DEFAULT 'COMPANY',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_users" ("createdAt", "email", "entityType", "id", "isEmailVerified", "isIdentityVerified", "name", "nif", "password", "updatedAt") SELECT "createdAt", "email", "entityType", "id", "isEmailVerified", "isIdentityVerified", "name", "nif", "password", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_nif_key" ON "users"("nif");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
