

## 🐳 Entendendo antes de sair digitando

![Image](https://business-science.github.io/shiny-production-with-aws-book/img/05_docker_cli/docker_help.jpg)

![Image](https://i.sstatic.net/k01Uj.png)


Antes dos comandos, um ponto simples que evita muita confusão:

👉 Docker trabalha com três coisas principais:

* **Imagens** (modelos)
* **Containers** (execução)
* **Volumes / redes** (dados e comunicação)

Agora sim, vamos para o que interessa.

---

## 🚀 Comandos essenciais (os mais usados)

### ▶️ Rodar um container

```bash
docker run nginx
```

👉 Baixa a imagem (se não tiver) e executa.

---

### ▶️ Rodar com porta exposta

```bash
docker run -p 8080:80 nginx
```

👉 Acesse no navegador:

```
http://localhost:8080
```

---

### ▶️ Rodar em background

```bash
docker run -d nginx
```

👉 O container roda “por trás”, sem travar o terminal.

---

### ▶️ Nomear um container

```bash
docker run -d --name meu-nginx nginx
```

---

## 📋 Listagem e inspeção

### Ver containers rodando

```bash
docker ps
```

---

### Ver todos (inclusive parados)

```bash
docker ps -a
```

---

### Ver imagens

```bash
docker images
```

---

### Ver detalhes de um container

```bash
docker inspect <nome-ou-id>
```

---

## ⛔ Parar, iniciar e remover

### Parar container

```bash
docker stop meu-nginx
```

---

### Iniciar novamente

```bash
docker start meu-nginx
```

---

### Reiniciar

```bash
docker restart meu-nginx
```

---

### Remover container

```bash
docker rm meu-nginx
```

---

### Remover imagem

```bash
docker rmi nginx
```

---

## 🧪 Executar comandos dentro do container

### Entrar no container (modo interativo)

```bash
docker exec -it meu-nginx bash
```

👉 Muito usado para debug.

---

### Ver logs

```bash
docker logs meu-nginx
```

---

### Logs em tempo real

```bash
docker logs -f meu-nginx
```

---

## 🏗️ Trabalhando com imagens

### Build de uma imagem

```bash
docker build -t meu-app .
```

---

### Baixar imagem

```bash
docker pull nginx
```

---

### Enviar imagem (Docker Hub)

```bash
docker push meu-usuario/meu-app
```

---

## 💾 Volumes (dados persistentes)

### Criar volume

```bash
docker volume create meu-volume
```

---

### Usar volume

```bash
docker run -v meu-volume:/app nginx
```

---

### Listar volumes

```bash
docker volume ls
```

---

## 🔗 Redes (containers conversando entre si)

### Listar redes

```bash
docker network ls
```

---

### Criar rede

```bash
docker network create minha-rede
```

---

### Rodar container na rede

```bash
docker run -d --network minha-rede nginx
```

---

## 🧩 Docker Compose (multi-serviços)

### Subir serviços

```bash
docker-compose up
```

---

### Rodar em background

```bash
docker-compose up -d
```

---

### Parar tudo

```bash
docker-compose down
```

---

### Ver logs

```bash
docker-compose logs
```

---

## 🧹 Limpeza (muito importante)

Com o tempo, Docker acumula lixo.

### Remover containers parados

```bash
docker container prune
```

---

### Remover imagens não usadas

```bash
docker image prune
```

---

### Limpeza geral (cuidado!)

```bash
docker system prune
```

---

## 🧠 Dicas que vão te salvar tempo

* Sempre use `--name` para não depender de ID
* Use `-d` para rodar em background
* Use `logs -f` para debug
* Prefira `docker-compose` quando tiver mais de 1 serviço
* Se “não funciona”, 90% das vezes é:

  * porta errada
  * container parado
  * erro no build

---

## 🏁 Resumo prático

Se você decorar esses aqui, já trabalha bem com Docker:

```bash
docker run
docker ps
docker stop
docker rm
docker logs
docker build
docker exec
docker-compose up
docker system prune
```
