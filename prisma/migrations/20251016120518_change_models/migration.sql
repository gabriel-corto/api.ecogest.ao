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
    "role" TEXT DEFAULT 'COMPANY',
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "idocId" TEXT,
    "otpId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "users_idocId_fkey" FOREIGN KEY ("idocId") REFERENCES "idoc" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "users_otpId_fkey" FOREIGN KEY ("otpId") REFERENCES "otp" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_users" ("createdAt", "email", "entityType", "id", "idocId", "isEmailVerified", "isIdentityVerified", "name", "nif", "otpId", "password", "role", "status", "updatedAt") SELECT "createdAt", "email", "entityType", "id", "idocId", "isEmailVerified", "isIdentityVerified", "name", "nif", "otpId", "password", "role", "status", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_nif_key" ON "users"("nif");
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_idocId_key" ON "users"("idocId");
CREATE UNIQUE INDEX "users_otpId_key" ON "users"("otpId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
