# Tutorial completo: adicionando Docker em uma API Node + Express + TypeScript + Prisma + PostgreSQL

## 1. O objetivo final

Ao final, você terá um projeto onde:

* a API roda em um serviço
* o PostgreSQL roda em outro serviço
* os dois serviços se comunicam entre si
* o Prisma conecta normalmente ao banco
* você consegue subir tudo com um único comando
* o ambiente fica padronizado para qualquer dev do time

---

# 2. Como esse ambiente vai funcionar

Vamos trabalhar com **2 serviços** principais no `docker-compose.yml`:

* **app** → sua API Node.js
* **db** → banco PostgreSQL

Fluxo:

1. Docker Compose sobe o banco
2. Docker Compose sobe a API
3. A API se conecta ao banco usando o nome do serviço do banco
4. Prisma usa essa conexão para migrations e consultas

---

# 3. Estrutura sugerida do projeto

Uma estrutura inicial pode ser esta:

```bash
meu-projeto/
├─ prisma/
│  └─ schema.prisma
├─ src/
│  ├─ server.ts
│  └─ app.ts
├─ package.json
├─ package-lock.json
├─ tsconfig.json
├─ .env
├─ .dockerignore
├─ Dockerfile
└─ docker-compose.yml
```

---

# 4. Pré-requisitos

Você precisa ter instalado na máquina:

* Docker
* Docker Compose

Em versões atuais, o Compose normalmente já vem integrado ao Docker Desktop.

---

# 5. Exemplo de projeto base

Se você ainda não tiver o projeto criado, pode começar assim:

## Inicializar projeto Node

```bash
npm init -y
```

## Instalar dependências

```bash
npm install express @prisma/client
npm install -D typescript ts-node-dev @types/node @types/express prisma
```

## Criar TypeScript

```bash
npx tsc --init
```

## Inicializar Prisma

```bash
npx prisma init
```

Isso cria a pasta `prisma/` e também um arquivo `.env`.

---

# 6. Configurando o `package.json`

Um exemplo de `package.json` com scripts úteis:

```json
{
  "name": "api-docker-node-express-ts-prisma",
  "version": "1.0.0",
  "main": "dist/server.js",
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate dev",
    "prisma:deploy": "prisma migrate deploy"
  },
  "dependencies": {
    "@prisma/client": "^6.0.0",
    "express": "^4.21.0"
  },
  "devDependencies": {
    "@types/express": "^5.0.0",
    "@types/node": "^22.0.0",
    "prisma": "^6.0.0",
    "ts-node-dev": "^2.0.0",
    "typescript": "^5.0.0"
  }
}
```

---

# 7. Criando a API básica

## `src/app.ts`

```ts
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API rodando com Docker, Express, TypeScript e Prisma!" });
});

export { app };
```

## `src/server.ts`

```ts
import { app } from "./app";

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

### Por que usar `0.0.0.0`?

Porque dentro do container sua aplicação precisa escutar em todas as interfaces de rede.
Se usar só `localhost`, pode não funcionar corretamente fora do container.

---

# 8. Configurando o Prisma

## `prisma/schema.prisma`

Exemplo simples:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}
```

---

# 9. Entendendo a `DATABASE_URL`

Esse ponto é essencial.

Quando a API estiver rodando **fora do Docker**, normalmente você poderia usar algo como:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/meubanco?schema=public"
```

Mas quando a API estiver rodando **dentro do Docker Compose**, `localhost` deixa de ser o banco.

Dentro do Compose, a API deve acessar o PostgreSQL usando o **nome do serviço**, por exemplo:

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/meubanco?schema=public"
```

Aqui, `db` é o nome do serviço do banco no `docker-compose.yml`.

---

# 10. Criando o arquivo `.env`

## `.env`

```env
PORT=3000

DATABASE_URL="postgresql://postgres:postgres@db:5432/meubanco?schema=public"

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=meubanco
```

---

# 11. Criando o `.dockerignore`

Esse arquivo evita enviar arquivos desnecessários para o build da imagem.

## `.dockerignore`

```dockerignore
node_modules
dist
.git
.gitignore
Dockerfile
docker-compose.yml
npm-debug.log
.env
```

### Observação importante

Em alguns cenários você pode querer copiar o `.env` para dentro do container, mas em geral é melhor deixar o Docker Compose injetar as variáveis via `env_file` ou `environment`.

---

# 12. Criando o Dockerfile

Agora vamos criar a imagem da aplicação.

## `Dockerfile`

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

---

# 13. Entendendo cada linha do Dockerfile

## `FROM node:22-alpine`

Define a imagem base.
Aqui estamos usando Node em uma versão Alpine, que é mais leve.

## `WORKDIR /app`

Define a pasta de trabalho dentro do container.

## `COPY package*.json ./`

Copia `package.json` e `package-lock.json`.

## `RUN npm install`

Instala as dependências.

## `COPY . .`

Copia o restante do projeto para dentro do container.

## `RUN npx prisma generate`

Gera o Prisma Client com base no schema.

## `EXPOSE 3000`

Documenta que a aplicação usa a porta 3000.

## `CMD ["npm", "run", "dev"]`

Comando que será executado quando o container iniciar.

---

# 14. Criando o `docker-compose.yml`

Agora vamos orquestrar app + banco.

## `docker-compose.yml`

```yaml
services:
  db:
    image: postgres:16-alpine
    container_name: api_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  app:
    build: .
    container_name: api_app
    restart: unless-stopped
    depends_on:
      - db
    ports:
      - "${PORT}:3000"
    env_file:
      - .env
    volumes:
      - .:/app
      - /app/node_modules
    command: sh -c "npx prisma generate && npm run dev"

volumes:
  postgres_data:
```

---

# 15. Entendendo o `docker-compose.yml`

## Serviço `db`

### `image: postgres:16-alpine`

Usa a imagem oficial do PostgreSQL.

### `environment`

Define usuário, senha e nome do banco.

### `ports`

```yaml
- "5432:5432"
```

Expõe a porta do banco para sua máquina local.

### `volumes`

```yaml
- postgres_data:/var/lib/postgresql/data
```

Persiste os dados do banco, mesmo que o container seja recriado.

---

## Serviço `app`

### `build: .`

Manda o Compose construir a imagem usando o `Dockerfile` da raiz.

### `depends_on`

Garante que o serviço `db` seja iniciado antes do `app`.

**Importante:** isso não significa que o banco já está pronto para aceitar conexão, apenas que foi iniciado.

### `ports`

```yaml
- "${PORT}:3000"
```

Expõe a API.

### `env_file`

Carrega as variáveis do `.env`.

### `volumes`

```yaml
- .:/app
- /app/node_modules
```

Isso faz duas coisas:

* monta o código local dentro do container
* preserva o `node_modules` do container

Isso é muito útil em desenvolvimento porque, ao alterar o código, o container enxerga a mudança imediatamente.

### `command`

```yaml
sh -c "npx prisma generate && npm run dev"
```

Executa o Prisma Generate e depois sobe a aplicação em modo desenvolvimento.

---

# 16. Como subir o projeto

Na raiz do projeto, rode:

```bash
docker compose up --build
```

Esse comando:

* constrói a imagem da API
* sobe o PostgreSQL
* sobe a API

Se quiser em background:

```bash
docker compose up --build -d
```

---

# 17. Como verificar se tudo subiu

## Ver containers rodando

```bash
docker compose ps
```

## Ver logs

```bash
docker compose logs -f
```

Se quiser logs só da API:

```bash
docker compose logs -f app
```

Se quiser logs só do banco:

```bash
docker compose logs -f db
```

---

# 18. Como rodar migrations do Prisma

Depois que o banco estiver no ar, você pode executar migrations.

## Criar migration

```bash
docker compose exec app npx prisma migrate dev --name init
```

Isso vai:

* criar a migration
* aplicar no banco
* atualizar o Prisma Client

---

# 19. Como acessar o Prisma Studio

Se quiser usar o Prisma Studio:

```bash
docker compose exec app npx prisma studio --hostname 0.0.0.0 --port 5555
```

Para acessar de fora do container, você precisaria expor essa porta no Compose:

```yaml
ports:
  - "3000:3000"
  - "5555:5555"
```

---

# 20. Como reiniciar automaticamente quando o código mudar

Esse é um ponto muito importante para desenvolvimento.

O Docker sozinho **não reinicia a aplicação porque o código mudou**.
Quem faz isso é a ferramenta de desenvolvimento que está rodando dentro do container.

No nosso caso, usamos:

```json
"dev": "ts-node-dev --respawn --transpile-only src/server.ts"
```

E também montamos o volume:

```yaml
volumes:
  - .:/app
  - /app/node_modules
```

Resultado:

* você altera um arquivo local
* essa alteração aparece dentro do container
* o `ts-node-dev` detecta a mudança
* a API reinicia automaticamente

Isso é o comportamento ideal em desenvolvimento.

---

# 21. Como testar a API

Depois de subir tudo, acesse:

```bash
http://localhost:3000
```

Resposta esperada:

```json
{
  "message": "API rodando com Docker, Express, TypeScript e Prisma!"
}
```

---

# 22. Fluxo real de desenvolvimento

Um fluxo bom no dia a dia seria:

## Primeira vez

```bash
docker compose up --build
```

## Criar migration

```bash
docker compose exec app npx prisma migrate dev --name init
```

## Gerar client, se necessário

```bash
docker compose exec app npx prisma generate
```

## Ver logs

```bash
docker compose logs -f app
```

## Parar tudo

```bash
docker compose down
```

## Parar e remover volumes também

```bash
docker compose down -v
```

Use `-v` com cuidado, porque isso apaga os dados persistidos do banco.

---

# 23. Exemplo com Prisma Client na API

Vamos criar uma rota real usando Prisma.

## `src/lib/prisma.ts`

```ts
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
```

## Atualize `src/app.ts`

```ts
import express from "express";
import { prisma } from "./lib/prisma";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API rodando com Docker, Express, TypeScript e Prisma!" });
});

app.post("/users", async (req, res) => {
  const { name, email } = req.body;

  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  res.status(201).json(user);
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json(users);
});

export { app };
```

---

# 24. Possíveis problemas comuns

## Erro de conexão com o banco

Normalmente acontece por um destes motivos:

* `DATABASE_URL` está usando `localhost` em vez de `db`
* banco ainda não ficou pronto
* usuário, senha ou nome do banco estão errados

---

## Prisma não conecta ao PostgreSQL logo ao subir

`depends_on` só garante ordem de subida, não prontidão.

Se isso acontecer, algumas soluções comuns são:

* reiniciar o container da API
* adicionar script de espera pelo banco
* implementar retry de conexão

Para projetos simples, muitas vezes reiniciar a API já resolve.

---

## Alterei código e não atualizou

Verifique se:

* o volume `.:/app` está configurado
* o script `npm run dev` usa `ts-node-dev`
* o container da API está rodando o comando correto

---

## Erro com `node_modules`

Por isso usamos:

```yaml
- /app/node_modules
```

Isso evita conflito entre o `node_modules` do host e o do container.

---

# 25. Versão mais profissional para produção

O que montamos até aqui está excelente para **desenvolvimento**.

Para produção, normalmente você faria alguns ajustes:

* compilar TypeScript com `npm run build`
* rodar `node dist/server.js`
* não montar volume do código
* usar imagem menor e otimizada
* rodar `prisma migrate deploy`
* usar multi-stage build

Exemplo de comando de produção:

```dockerfile
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
```

---

# 26. Exemplo de Dockerfile mais preparado para produção

```dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
```

Esse modelo já é mais adequado para ambientes de deploy.

---

# 27. Arquivos finais esperados

## `.env`

```env
PORT=3000
DATABASE_URL="postgresql://postgres:postgres@db:5432/meubanco?schema=public"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=meubanco
```

## `Dockerfile`

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

## `docker-compose.yml`

```yaml
services:
  db:
    image: postgres:16-alpine
    container_name: api_postgres
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  app:
    build: .
    container_name: api_app
    restart: unless-stopped
    depends_on:
      - db
    ports:
      - "${PORT}:3000"
    env_file:
      - .env
    volumes:
      - .:/app
      - /app/node_modules
    command: sh -c "npx prisma generate && npm run dev"

volumes:
  postgres_data:
```

---

# 28. Resumo do passo a passo

A ordem ideal é esta:

## 1. Criar projeto Node + TS + Express

## 2. Instalar Prisma e configurar schema

## 3. Criar `.env`

## 4. Criar `Dockerfile`

## 5. Criar `docker-compose.yml`

## 6. Subir tudo com:

```bash
docker compose up --build
```

## 7. Rodar migration:

```bash
docker compose exec app npx prisma migrate dev --name init
```

## 8. Desenvolver normalmente com hot reload

---

# 29. Comandos mais importantes

```bash
docker compose up --build
docker compose up -d
docker compose down
docker compose down -v
docker compose ps
docker compose logs -f
docker compose exec app sh
docker compose exec app npx prisma migrate dev --name init
docker compose exec app npx prisma generate
```

---

# 30. Boa prática final

Para esse stack, pense assim:

* **Dockerfile** = como construir a aplicação
* **docker-compose.yml** = como orquestrar os serviços
* **.env** = como parametrizar o ambiente
* **Prisma** = como mapear e acessar o banco
* **volume + ts-node-dev** = como ter recarga automática no desenvolvimento

