-- AlterTable
ALTER TABLE "User" ADD COLUMN     "preferencesId" INTEGER;

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" SERIAL NOT NULL,
    "diet" TEXT NOT NULL DEFAULT '',
    "selectedMealsList" BOOLEAN[] DEFAULT ARRAY[true, true, true, true, true, true, true, true, true, true, true, true, true, true]::BOOLEAN[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_key" ON "UserPreference"("userId");

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
