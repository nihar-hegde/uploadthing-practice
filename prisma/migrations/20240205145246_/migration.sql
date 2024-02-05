-- CreateTable
CREATE TABLE "InputModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "images" TEXT[],

    CONSTRAINT "InputModel_pkey" PRIMARY KEY ("id")
);
