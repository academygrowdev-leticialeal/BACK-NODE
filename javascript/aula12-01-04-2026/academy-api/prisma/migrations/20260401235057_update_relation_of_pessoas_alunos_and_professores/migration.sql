/*
  Warnings:

  - A unique constraint covering the columns `[perfil_id]` on the table `alunos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[perfil_id]` on the table `professores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "alunos_perfil_id_key" ON "academy_api"."alunos"("perfil_id");

-- CreateIndex
CREATE UNIQUE INDEX "professores_perfil_id_key" ON "academy_api"."professores"("perfil_id");
