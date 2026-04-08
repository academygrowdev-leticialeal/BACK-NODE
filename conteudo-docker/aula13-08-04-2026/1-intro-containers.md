
## 🐳 O que é Docker (sem complicação)

![Image](https://www.docker.com/app/uploads/2021/11/container-what-is-container.png)

![Image](https://www.netapp.com/media/container-vs-vm-inline1_tcm19-82163.png?v=85344)

![Image](https://miro.medium.com/0%2A04_th-m0fzJTNqeQ.jpg)

Imagine que você precisa rodar um projeto em diferentes computadores.
Em cada máquina, pode faltar algo: versão do Node, Python, banco, etc.

O Docker resolve isso criando **um ambiente padronizado**, que funciona igual em qualquer lugar.

👉 Em termos simples:
**Docker empacota sua aplicação + tudo que ela precisa para rodar.**

Esse “pacote” é chamado de **container**.

---

## 📦 Conceitos fundamentais (os mais importantes)

Vamos aos termos que você vai ver o tempo todo:

### 🧱 Imagem (Image)

É como uma **receita pronta**.

Ela contém:

* Sistema base (ex: Linux)
* Dependências (Node, Python, etc.)
* Seu código (opcional)

Exemplo:
Uma imagem pode ser “Node.js + app backend”.

---

### 📦 Container

É a **imagem em execução**.

👉 Se a imagem é a receita, o container é o prato pronto.

Você pode:

* Criar
* Rodar
* Parar
* Deletar

---

### 🐳 Dockerfile

É o arquivo onde você define **como criar uma imagem**.

Exemplo simples:

```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]
```

Isso diz:

1. Use Node 18
2. Copie o projeto
3. Instale dependências
4. Rode a aplicação

---

### 📚 Docker Hub

É tipo o “GitHub das imagens”.

🔗 Você encontra imagens prontas como:

* banco de dados (Postgres, Mongo)
* servidores (Nginx)
* linguagens (Node, Python)

---

### 🔌 Portas

Containers são isolados.
Para acessar algo (ex: API), você precisa **mapear portas**.

Exemplo:


```bash
-p 3000:3000
```

👉 Isso conecta:

* porta do seu computador
* porta do container

---

### 💾 Volume

Serve para **persistir dados**.

Sem volume:

* parou o container → perdeu tudo

Com volume:

* dados continuam salvos

---

## ⚙️ Instalando Docker

Você pode baixar direto do site oficial:

👉 Docker Desktop

Ele já vem com:

* Docker Engine
* Interface gráfica (opcional)
* CLI (linha de comando)

---

## 🚀 Primeiros comandos (na prática)

Depois de instalar, abra o terminal e teste:

### Ver versão

```bash
docker --version
```

---

### Rodar um container simples

```bash
docker run hello-world
```

👉 Isso baixa uma imagem e executa.

---

### Rodar um servidor web

```bash
docker run -p 8080:80 nginx
```

Depois acesse:

```
http://localhost:8080
```

---

### Listar containers

```bash
docker ps
```

---

### Parar container

```bash
docker stop <id>
```

---

## 🧪 Criando seu primeiro projeto com Docker

Vamos supor um projeto Node.js simples.

### 1. Crie um Dockerfile

```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

---

### 2. Build da imagem

```bash
docker build -t meu-app .
```

---

### 3. Rodar container

```bash
docker run -p 3000:3000 meu-app
```

Pronto. Seu app está rodando dentro de um container.

---

## 🧩 Docker Compose (quando tem vários serviços)

![Image](https://i.sstatic.net/zJxSM.png)

![Image](https://www.researchgate.net/profile/Adel-Toosi-2/publication/323405045/figure/fig2/AS%3A601507347038211%401520421935481/Simple-example-of-Docker-compose-file.png)

![Image](https://www.researchgate.net/profile/Aditya-Raj-12/publication/351626260/figure/fig1/AS%3A1024410047750148%401621249796981/Microservice-architecture-with-docker.png)

![Image](https://dz2cdn1.dzone.com/storage/temp/16332748-1666720612139.png)

Se você tiver:

* API
* Banco de dados
* Redis

Fica difícil rodar tudo manualmente.

👉 Entra o **Docker Compose**

Exemplo:

```yaml
version: '3'

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

Rodar tudo:

```bash
docker-compose up
```

---

## 🧠 Quando usar Docker (na vida real)

Docker é muito útil para:

* Padronizar ambiente de desenvolvimento
* Evitar “funciona na minha máquina”
* Subir projetos rapidamente
* Testar aplicações isoladas
* Deploy em servidores

---

## ⚠️ Conceitos importantes para não se perder

Algumas diferenças essenciais:

**Container vs Máquina Virtual**

* Container: leve, rápido
* VM: pesado, completo

**Imagem vs Container**

* Imagem = modelo
* Container = execução

**Docker vs Kubernetes**

* Docker: roda containers
* Kubernetes: gerencia muitos containers em escala

---

## 🏁 Resumo (o que você precisa guardar)

Se você lembrar disso, já está bem:

* Docker empacota aplicações
* Imagem é o modelo
* Container é a execução
* Dockerfile define como construir
* Compose orquestra múltiplos serviços

