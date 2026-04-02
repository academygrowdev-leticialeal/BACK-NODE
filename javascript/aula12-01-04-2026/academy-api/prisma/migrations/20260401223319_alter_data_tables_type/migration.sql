/*
  Warnings:

  - A unique constraint covering the columns `[aluno_id,turma_id]` on the table `matriculas` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "academy_api"."alunos" DROP CONSTRAINT "fk_perfil";

-- DropForeignKey
ALTER TABLE "academy_api"."matriculas" DROP CONSTRAINT "matriculas_aluno_id_fkey";

-- DropForeignKey
ALTER TABLE "academy_api"."matriculas" DROP CONSTRAINT "matriculas_turma_id_fkey";

-- DropForeignKey
ALTER TABLE "academy_api"."professores" DROP CONSTRAINT "fk_perfil";

-- DropForeignKey
ALTER TABLE "academy_api"."turmas" DROP CONSTRAINT "turmas_disciplina_id_fkey";

-- DropForeignKey
ALTER TABLE "academy_api"."turmas" DROP CONSTRAINT "turmas_professor_id_fkey";

-- AlterTable
ALTER TABLE "academy_api"."alunos" ALTER COLUMN "criado_em" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "atualizado_em" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "academy_api"."disciplinas" ALTER COLUMN "criado_em" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "atualizado_em" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "academy_api"."matriculas" ALTER COLUMN "criado_em" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "atualizado_em" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "academy_api"."pessoas" ALTER COLUMN "criado_em" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "atualizado_em" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "academy_api"."professores" ALTER COLUMN "criado_em" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "atualizado_em" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "academy_api"."turmas" ALTER COLUMN "criado_em" SET DATA TYPE TIMESTAMPTZ,
ALTER COLUMN "atualizado_em" SET DATA TYPE TIMESTAMPTZ;

-- CreateIndex
CREATE INDEX "matriculas_aluno_id_turma_id_idx" ON "academy_api"."matriculas"("aluno_id", "turma_id");

-- CreateIndex
CREATE UNIQUE INDEX "matriculas_aluno_id_turma_id_key" ON "academy_api"."matriculas"("aluno_id", "turma_id");

-- CreateIndex
CREATE INDEX "pessoas_email_idx" ON "academy_api"."pessoas"("email");

-- CreateIndex
CREATE INDEX "turmas_disciplina_id_professor_id_idx" ON "academy_api"."turmas"("disciplina_id", "professor_id");

-- AddForeignKey
ALTER TABLE "academy_api"."alunos" ADD CONSTRAINT "fk_perfil" FOREIGN KEY ("perfil_id") REFERENCES "academy_api"."pessoas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_api"."professores" ADD CONSTRAINT "fk_perfil" FOREIGN KEY ("perfil_id") REFERENCES "academy_api"."pessoas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_api"."turmas" ADD CONSTRAINT "turmas_disciplina_id_fkey" FOREIGN KEY ("disciplina_id") REFERENCES "academy_api"."disciplinas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_api"."turmas" ADD CONSTRAINT "turmas_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "academy_api"."professores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_api"."matriculas" ADD CONSTRAINT "matriculas_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "academy_api"."alunos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academy_api"."matriculas" ADD CONSTRAINT "matriculas_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "academy_api"."turmas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
