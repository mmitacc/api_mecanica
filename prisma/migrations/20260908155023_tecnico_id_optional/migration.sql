-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_tecnico_id_fkey";

-- AlterTable
ALTER TABLE "tickets" ALTER COLUMN "tecnico_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_tecnico_id_fkey" FOREIGN KEY ("tecnico_id") REFERENCES "usuarios"("id") ON DELETE SET NULL ON UPDATE CASCADE;
