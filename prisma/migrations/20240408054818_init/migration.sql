-- CreateTable
CREATE TABLE "Reseller" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "licenseDuration" INTEGER NOT NULL DEFAULT 2,
    "resellerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "backerId" TEXT,
    "pledgeAmount" TEXT,
    "backerNumber" TEXT,

    CONSTRAINT "Reseller_pkey" PRIMARY KEY ("id")
);
