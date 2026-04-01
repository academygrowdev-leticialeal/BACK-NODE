
-- Criar um objeto estrutura/entidades de DB
CREATE TYPE "StatusTurma" AS ENUM (
  'ABERTA',
  'ENCERRADA'
);

CREATE TYPE "SituacaoMatricula" AS ENUM (
  'CURSANDO',
  'APROVADO',
  'REPROVADO',
  'TRANCADO'
);

select gen_random_uuid();

CREATE TABLE "pessoas" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "primeiro_nome" varchar NOT NULL,
  "sobrenome" varchar NOT NULL,
  "nome_social" varchar,
  "email" varchar UNIQUE NOT NULL,
  "telefone" varchar(11) NOT NULL,
  "data_nascimento" date,
  "ativo" bool NOT NULL DEFAULT true,
  "criado_em" timestamp NOT NULL DEFAULT (now()),
  "atualizado_em" timestamp NOT NULL DEFAULT (now())
);

select * from pessoas;

CREATE TABLE "alunos" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "codigo_matricula" varchar(10) UNIQUE NOT NULL,
  "perfil_id" uuid NOT NULL,
  "criado_em" timestamp NOT NULL DEFAULT (now()),
  "atualizado_em" timestamp NOT NULL DEFAULT (now()),
   CONSTRAINT fk_perfil
      FOREIGN KEY(perfil_id)
	  REFERENCES pessoas(id)
	  ON DELETE CASCADE
);

CREATE TABLE "professores" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "remuneracao" decimal(7,2),
  "perfil_id" uuid NOT NULL,
  "criado_em" timestamp NOT NULL DEFAULT (now()),
  "atualizado_em" timestamp NOT NULL DEFAULT (now()),
   CONSTRAINT fk_perfil
      FOREIGN KEY(perfil_id)
	  REFERENCES pessoas(id)
	  ON DELETE CASCADE
);

CREATE TABLE "turmas" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "max_vagas" int NOT NULL,
  "periodo" varchar(6) NOT NULL,
  "status" "StatusTurma" NOT NULL DEFAULT 'ABERTA',
  "disciplina_id" uuid NOT NULL,
  "professor_id" uuid NOT NULL,
  "ativo" bool NOT NULL DEFAULT true,
  "criado_em" timestamp NOT NULL DEFAULT (now()),
  "atualizado_em" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "disciplinas" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "titulo" varchar NOT NULL,
  "descricao" text,
  "ativo" bool NOT NULL DEFAULT true,
  "criado_em" timestamp NOT NULL DEFAULT (now()),
  "atualizado_em" timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE "matriculas" (
  "id" uuid UNIQUE PRIMARY KEY NOT NULL DEFAULT (gen_random_uuid()),
  "aluno_id" uuid NOT NULL,
  "turma_id" uuid NOT NULL,
  "nota_1" decimal(4,2),
  "nota_2" decimal(4,2),
  "frequencia" int,
  "situacao" "SituacaoMatricula" NOT NULL DEFAULT 'CURSANDO',
  "criado_em" timestamp NOT NULL DEFAULT (now()),
  "atualizado_em" timestamp NOT NULL DEFAULT (now())
);


ALTER TABLE "turmas" ADD FOREIGN KEY ("disciplina_id") REFERENCES "disciplinas" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "turmas" ADD FOREIGN KEY ("professor_id") REFERENCES "professores" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "matriculas" ADD FOREIGN KEY ("aluno_id") REFERENCES "alunos" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "matriculas" ADD FOREIGN KEY ("turma_id") REFERENCES "turmas" ("id") DEFERRABLE INITIALLY IMMEDIATE;
