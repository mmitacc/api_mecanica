-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('PROFESOR', 'TECNICO', 'DIRECTOR');

-- CreateEnum
CREATE TYPE "EstadoTickets" AS ENUM ('ABIERTO', 'EN_PROCESO', 'RESULTO');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'PROFESOR',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "aula" TEXT NOT NULL,
    "estado" "EstadoTickets" NOT NULL DEFAULT 'ABIERTO',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creador_id" INTEGER NOT NULL,
    "tecnico_id" INTEGER NOT NULL,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_creador_id_fkey" FOREIGN KEY ("creador_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_tecnico_id_fkey" FOREIGN KEY ("tecnico_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
