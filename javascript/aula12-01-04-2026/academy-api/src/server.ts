import express from 'express'; // builder
import cors from 'cors';
import studentsRoutes from './routes/students.routes';
import { envs } from './envs';


const app = express(); // implicitos -> a atribuição de tipo é dinâmica

app.use(express.json());
app.use(cors()); // regras habilitando * (todos) origem e * (todos) verbos http

// Definir as rotas da API
app.use(studentsRoutes);



app.listen(envs.PORT, () => {
    console.log(`Server is running on port ${envs.PORT}`);
});

