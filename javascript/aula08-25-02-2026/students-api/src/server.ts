import express from 'express';
import cors from 'cors';
import studentsRoutes from './routes/students.routes';


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());


app.use(studentsRoutes);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

