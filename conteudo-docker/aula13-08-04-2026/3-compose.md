

## 🧩 O que é Docker Compose (de verdade)

![Image](https://media2.dev.to/dynamic/image/width%3D1000%2Cheight%3D420%2Cfit%3Dcover%2Cgravity%3Dauto%2Cformat%3Dauto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F3jdqbz263qx7iufkm63b.png)

![Image](https://miro.medium.com/1%2AM1hP-4UgwUJYJrXCGO3oqQ.png)

![Image](https://accesto.com/blog/static/da655bd4bde7fe34eee74d8e5c6bf1b1/3e2b5/docker-networks-split.jpg)

![Image](https://dz2cdn1.dzone.com/storage/temp/16332748-1666720612139.png)

Se o Docker resolve **um container**, o Docker Compose resolve **um sistema inteiro**.

👉 Pense assim:
Você não roda só um app. Normalmente você precisa de:

* Backend (Node, Python…)
* Banco de dados (Postgres, Mongo)
* Cache (Redis)
* Mensageria, etc.

O Compose permite definir tudo isso em **um único arquivo (`docker-compose.yml`)** e subir tudo com um comando.

---

## 📦 Estrutura básica do `docker-compose.yml`

Aqui está o esqueleto mínimo:

```yaml
version: "3.9"

services:
  app:
    build: .
    ports:
      - "3000:3000"

  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: example
```

### 🧠 Conceitos-chave

* **services** → cada container
* **build** → usa Dockerfile
* **image** → usa imagem pronta
* **ports** → expõe portas
* **environment** → variáveis de ambiente

---

## 🚀 Comandos essenciais (Compose)

```bash
docker-compose up
docker-compose up -d
docker-compose down
docker-compose logs
docker-compose ps
```

👉 Esses 5 já resolvem 80% do dia a dia.

---

## 🔗 Comunicação entre serviços

No Compose, os serviços já se “enxergam” automaticamente.

Exemplo:

```yaml
services:
  app:
    build: .
    depends_on:
      - db

  db:
    image: postgres
```

👉 Dentro do app, você conecta assim:

```
host: db
porta: 5432
```

Sem IP. Sem gambiarra.

---

## 💾 Persistência de dados (volumes)

Sem volume, você perde tudo ao reiniciar.

```yaml
services:
  db:
    image: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

👉 Isso mantém os dados mesmo após `down`.

---

## 🔄 Restart automático de containers

Muito importante em produção e também útil no dev.

```yaml
services:
  app:
    build: .
    restart: always
```

Opções:

* `no`
* `always`
* `on-failure`
* `unless-stopped`

---

## 🔥 Auto-reload (quando o código muda)

Aqui está o ponto que separa iniciante de quem usa bem.

### ✅ Estratégia correta: volume + watcher

```yaml
services:
  app:
    build: .
    volumes:
      - .:/app
    command: npm run dev
```

👉 O que acontece:

* Seu código local é “espelhado” dentro do container
* Mudou o arquivo → app reinicia automaticamente

---

### 🧠 Ferramentas por stack

* Node.js → `nodemon`
* NestJS → `--watch`
* Python → `uvicorn --reload`
* React/Vite → já tem hot reload

---

### ❗ Importante

Docker **não reinicia automaticamente só porque o código mudou**
👉 quem faz isso é o **processo dentro do container**

---

## ⚙️ Build vs Volume (quando usar cada um)

### 🔨 Build (produção)

```yaml
build: .
```

* Código “congelado”
* Ideal para deploy

---

### 🔄 Volume (desenvolvimento)

```yaml
volumes:
  - .:/app
```

* Código dinâmico
* Ideal para dev

---

## 🧠 Variáveis de ambiente (.env)

Compose lê automaticamente um `.env`:

```env
DB_USER=postgres
DB_PASS=123456
```

```yaml
environment:
  POSTGRES_USER: ${DB_USER}
  POSTGRES_PASSWORD: ${DB_PASS}
```

---

## 🧩 Profiles (nível intermediário)

Permite ativar serviços específicos:

```yaml
services:
  adminer:
    image: adminer
    profiles: ["dev"]
```

Rodar:

```bash
docker-compose --profile dev up
```

---

## 🏗️ Estrutura profissional (boas práticas)

Um projeto organizado costuma ter:

```
/project
  /app
  docker-compose.yml
  Dockerfile
  .env
  .dockerignore
```

---

## 🧠 Múltiplos ambientes (dev / prod)

Você pode ter:

```
docker-compose.yml
docker-compose.dev.yml
docker-compose.prod.yml
```

Rodar:

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

---

## 🧪 Debug e troubleshooting

### Ver logs

```bash
docker-compose logs -f
```

---

### Entrar no container

```bash
docker exec -it app bash
```

---

### Rebuild completo

```bash
docker-compose up --build
```

---

## 🧰 VSCode: plugins essenciais

Aqui entra produtividade real.

### 🔌 Docker VSCode Extension

* Visualizar containers
* Start/stop com clique
* Ver logs
* Explorar imagens

---

### 🔌 Dev Containers

* Abre o projeto dentro do container
* Ambiente 100% padronizado

---

### 🔌 YAML VSCode Extension

* Autocomplete para compose
* Evita erros de indentação

---

## 🚀 Dev Containers (nível profissional)

Você pode desenvolver **dentro do container**.

Arquivo `.devcontainer/devcontainer.json`:

```json
{
  "name": "Meu Projeto",
  "dockerComposeFile": "docker-compose.yml",
  "service": "app",
  "workspaceFolder": "/app"
}
```

👉 Resultado:

* Zero “funciona na minha máquina”
* Setup automático para qualquer dev

---

## ⚡ Estratégias avançadas

### Healthcheck

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000"]
  interval: 30s
  retries: 3
```

---

### depends_on com condição (limitação)

Compose **não garante que o serviço está pronto**, só que iniciou.

👉 Solução:

* usar wait-for-it
* ou retry no app

---

### Limitar recursos

```yaml
deploy:
  resources:
    limits:
      memory: 512M
```

---

## 🧹 Limpeza e manutenção

```bash
docker-compose down -v
```

👉 remove containers + volumes

---

## 🏁 O que separa iniciante de avançado

Se você dominar isso, já está em nível profissional:

* Usa volumes corretamente no dev
* Usa build para produção
* Configura `.env`
* Entende networking automático
* Usa Dev Containers
* Sabe debugar com logs e exec

---

## 🧭 Resumo final

Docker Compose é:

* Um **orquestrador local de containers**
* Base de qualquer ambiente moderno
* Essencial para backend, DevOps e times

E o ponto mais importante:

👉 **Compose não é só rodar container. É modelar o ambiente da aplicação.**

