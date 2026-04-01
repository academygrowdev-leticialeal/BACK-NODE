-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "academy_api";

-- CreateEnum
CREATE TYPE "academy_api"."SituacaoMatricula" AS ENUM ('CURSANDO', 'APROVADO', 'REPROVADO', 'TRANCADO');

-- CreateEnum
CREATE TYPE "academy_api"."StatusTurma" AS ENUM ('ABERTA', 'ENCERRADA');

-- CreateTable
CREATE TABLE "academy_api"."pessoas" (
    "id" UUID NOT NULL,
    "primeiro_nome" VARCHAR NOT NULL,
    "sobrenome" VARCHAR NOT NULL,
    "nome_social" VARCHAR,
    "email" VARCHAR NOT NULL,
    "telefone" VARCHAR(11) NOT NULL,
    "data_nascimento" DATE,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observacoes" TEXT,

    CONSTRAINT "pessoas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academy_api"."alunos" (
    "id" UUID NOT NULL,
    "codigo_matricula" VARCHAR(10) NOT NULL,
    "perfil_id" UUID NOT NULL,
    "criado_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alunos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academy_api"."professores" (
    "id" UUID NOT NULL,
    "remuneracao" DECIMAL(7,2),
    "perfil_id" UUID NOT NULL,
    "criado_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "professores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academy_api"."disciplinas" (
    "id" UUID NOT NULL,
    "titulo" VARCHAR NOT NULL,
    "descricao" TEXT,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "disciplinas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academy_api"."turmas" (
    "id" UUID NOT NULL,
    "max_vagas" INTEGER NOT NULL,
    "periodo" VARCHAR(6) NOT NULL,
    "status" "academy_api"."StatusTurma" NOT NULL DEFAULT 'ABERTA',
    "disciplina_id" UUID NOT NULL,
    "professor_id" UUID NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "turmas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academy_api"."matriculas" (
    "id" UUID NOT NULL,
    "aluno_id" UUID NOT NULL,
    "turma_id" UUID NOT NULL,
    "nota_1" DECIMAL(4,2),
    "nota_2" DECIMAL(4,2),
    "frequencia" INTEGER,
    "situacao" "academy_api"."SituacaoMatricula" NOT NULL DEFAULT 'CURSANDO',
    "criado_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "matriculas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_email_key" ON "academy_api"."pessoas"("email");

-- CreateIndex
CREATE UNIQUE INDEX "alunos_codigo_matricula_key" ON "academy_api"."alunos"("codigo_matricula");

-- AddForeignKey
ALTER TABLE "academy_api"."alunos" ADD CONSTRAINT "fk_perfil" FOREIGN KEY ("perfil_id") REFERENCES "academy_api"."pessoas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "academy_api"."professores" ADD CONSTRAINT "fk_perfil" FOREIGN KEY ("perfil_id") REFERENCES "academy_api"."pessoas"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "academy_api"."turmas" ADD CONSTRAINT "turmas_disciplina_id_fkey" FOREIGN KEY ("disciplina_id") REFERENCES "academy_api"."disciplinas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "academy_api"."turmas" ADD CONSTRAINT "turmas_professor_id_fkey" FOREIGN KEY ("professor_id") REFERENCES "academy_api"."professores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "academy_api"."matriculas" ADD CONSTRAINT "matriculas_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "academy_api"."alunos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "academy_api"."matriculas" ADD CONSTRAINT "matriculas_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "academy_api"."turmas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
