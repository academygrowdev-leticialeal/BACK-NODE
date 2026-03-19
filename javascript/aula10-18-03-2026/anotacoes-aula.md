# Identificando partes de uma URL de conexão



`postgresql://neondb_owner:npg_vYUzdl5DNsx7@ep-noisy-flower-acly1p8x.sa-east-1.aws.neon.tech/academy_db?sslmode=require&channel_binding=require`


`<sgbd>://<user>:<password>@<hostname>:<port>/<db_name>?<query-params-of-conection>`

```.env
SGBD = postgresql
USER = neondb_owner
PASSWORD = npg_vYUzdl5DNsx7
HOSTNAME = ep-noisy-flower-acly1p8x.sa-east-1.aws.neon.tech
PORT = 5432
DB_NAME = academy_db
PARAMS_CONECTION = sslmode=require&channel_binding=require
```

---

O [**NeonDB (ou Neon)**](https://neon.com/) é, de forma simples:

> 🧠 **Um banco de dados PostgreSQL na nuvem, totalmente gerenciado e “serverless”**

---

## 📘 De forma direta

O NeonDB é uma plataforma que permite usar **PostgreSQL sem precisar se preocupar com servidor, infraestrutura ou configuração complexa**.

Ou seja:

* você não instala nada
* não gerencia servidor
* só cria o banco e usa

---

## ⚙️ O que significa “serverless”?

“Serverless” não quer dizer que não existe servidor — mas sim que:

👉 **você não precisa gerenciar ele**

O Neon:

* liga automaticamente quando você usa
* desliga quando não está em uso (economiza custo)
* escala sozinho conforme a demanda

---

## 🚀 Principais características

* 🧩 **Compatível com PostgreSQL** (funciona como um Postgres normal)
* ☁️ **100% na nuvem**
* ⚡ **Escala automática**
* 💸 **Paga só pelo uso**
* 🌱 **Ambientes de teste com “branching”**
* 🔄 **Backup e recuperação instantânea**

Além disso, ele separa:

* **processamento (compute)**
* **armazenamento (storage)**

o que permite mais flexibilidade e performance 

---

Diagrama construido em aula - https://dbdiagram.io/d/academy_db-67ad203d263d6cf9a0f6a31f



