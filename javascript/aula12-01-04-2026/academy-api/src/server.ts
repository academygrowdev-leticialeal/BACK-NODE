import express from 'express'; // builder
import cors from 'cors';
import studentsRoutes from './routes/students.routes';


const app = express(); // implicitos -> a atribuição de tipo é dinâmica
const port = 3000;

app.use(express.json());
app.use(cors()); // regras habilitando * (todos) origem e * (todos) verbos http

// Definir as rotas da API
app.use(studentsRoutes);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

