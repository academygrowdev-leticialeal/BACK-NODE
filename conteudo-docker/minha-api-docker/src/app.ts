import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "API rodando com Docker, Express, TypeScript e Prisma!" });
});

export { app };