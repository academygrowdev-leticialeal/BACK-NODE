

# 📘 Introdução ao SQL (PostgreSQL) e suas Sublinguagens

## 🧠 O que é SQL?

SQL (*Structured Query Language*) é a linguagem usada para **interagir com bancos de dados relacionais**.

Neste material, utilizaremos o **PostgreSQL**, um dos bancos mais robustos e utilizados no mercado.

Com SQL, você consegue:

* Consultar dados
* Inserir informações
* Atualizar registros
* Excluir dados
* Gerenciar estrutura
* Controlar acessos

---

## 🗂️ Estrutura de um Banco de Dados

* **Banco de Dados** → conjunto de informações
* **Tabelas** → onde os dados são armazenados
* **Colunas** → atributos (ex: nome, idade)
* **Linhas (registros)** → os dados

#### Exemplo de tabela `usuarios`:

| id | nome | idade |
| -- | ---- | ----- |
| 1  | Ana  | 25    |
| 2  | João | 30    |

---

## 🔠 Sublinguagens do SQL

---

### 📊 1. DQL — Data Query Language

Responsável por **consultar dados**.

#### Comando principal:

```sql id="z8wh6i"
SELECT
```

#### Exemplos (PostgreSQL):

```sql id="n2hmdu"
-- Buscar todos os dados
SELECT * FROM usuarios;

-- Buscar colunas específicas
SELECT nome, idade FROM usuarios;

-- Filtrar dados
SELECT * FROM usuarios WHERE idade > 25;

-- Ordenar resultados
SELECT * FROM usuarios ORDER BY idade DESC;

-- Limitar resultados
SELECT * FROM usuarios LIMIT 5;
```

---

### ✏️ 2. DML — Data Manipulation Language

Manipula os dados dentro das tabelas.

#### Comandos:

* `INSERT`
* `UPDATE`
* `DELETE`

#### Exemplos (PostgreSQL):

```sql id="mxs3dn"
-- Inserir dados
INSERT INTO usuarios (nome, idade)
VALUES ('Maria', 28);

-- Inserir múltiplos registros
INSERT INTO usuarios (nome, idade)
VALUES 
  ('Carlos', 22),
  ('Fernanda', 31);

-- Atualizar dados
UPDATE usuarios
SET idade = 29
WHERE nome = 'Maria';

-- Deletar dados
DELETE FROM usuarios
WHERE nome = 'Maria';
```

---

### 🏗️ 3. DDL — Data Definition Language

Define e altera a estrutura do banco.

### Comandos:

* `CREATE`
* `ALTER`
* `DROP`

### Exemplos (PostgreSQL):

```sql id="jnr4v6"
-- Criar tabela com auto incremento (PostgreSQL)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INTEGER,
    email VARCHAR(150) UNIQUE
);

-- Alterar tabela
ALTER TABLE usuarios ADD COLUMN ativo BOOLEAN DEFAULT true;

-- Alterar tipo de coluna
ALTER TABLE usuarios ALTER COLUMN idade TYPE SMALLINT;

-- Deletar tabela
DROP TABLE usuarios;
```

💡 **Observação importante (PostgreSQL):**

* `SERIAL` é usado para auto incremento
* Alternativa moderna: `GENERATED ALWAYS AS IDENTITY`

Exemplo moderno:

```sql id="y9azl7"
id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY
```

---

## 🔐 4. DCL — Data Control Language

Controla permissões de acesso.

### Comandos:

* `GRANT`
* `REVOKE`

### Exemplos (PostgreSQL):

```sql id="px9v3p"
-- Dar permissão de leitura
GRANT SELECT ON TABLE usuarios TO usuario_app;

-- Dar permissão completa
GRANT ALL PRIVILEGES ON TABLE usuarios TO usuario_app;

-- Remover permissão
REVOKE SELECT ON TABLE usuarios FROM usuario_app;
```

---

## 🔄 5. TCL — Transaction Control Language

Gerencia **transações**.

No PostgreSQL, transações são extremamente importantes para garantir consistência.

### Comandos:

* `BEGIN`
* `COMMIT`
* `ROLLBACK`

### Exemplos:

```sql id="48y4yw"
-- Iniciar transação
BEGIN;

-- Operações
UPDATE contas SET saldo = saldo - 100 WHERE id = 1;
UPDATE contas SET saldo = saldo + 100 WHERE id = 2;

-- Confirmar
COMMIT;

-- Ou desfazer
ROLLBACK;
```

💡 PostgreSQL segue o modelo **ACID**:

* Atomicidade
* Consistência
* Isolamento
* Durabilidade

---

## ⚖️ Resumo Geral

| Sublinguagem | Função                 | Comandos principais     |
| ------------ | ---------------------- | ----------------------- |
| DQL          | Consultar dados        | SELECT                  |
| DML          | Manipular dados        | INSERT, UPDATE, DELETE  |
| DDL          | Estrutura do banco     | CREATE, ALTER, DROP     |
| DCL          | Controle de acesso     | GRANT, REVOKE           |
| TCL          | Controle de transações | BEGIN, COMMIT, ROLLBACK |

---

## 🎯 Conclusão

No PostgreSQL, além das operações básicas de SQL, você ganha:

* Tipagem mais robusta
* Controle avançado de transações
* Alto nível de confiabilidade
* Recursos modernos (como `IDENTITY`, JSON, etc.)

Dominar SQL com foco em PostgreSQL te prepara muito bem para aplicações reais e ambientes profissionais.

