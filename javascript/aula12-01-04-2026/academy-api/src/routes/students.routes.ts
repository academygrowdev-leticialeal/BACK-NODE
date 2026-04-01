import { Router } from 'express';
import { listAllStudents, getStudentsById, createStudent, updateStudent, deleteStudent } from '../controllers/students';

const studentsRoutes = Router();

studentsRoutes.get("/students", listAllStudents);
studentsRoutes.get("/students/:id", getStudentsById);
studentsRoutes.post("/students", createStudent);
studentsRoutes.put("/students/:id", updateStudent);
studentsRoutes.delete("/students/:id", deleteStudent);


// as rotas de alunos sejam exportadas depois de definidas
export default studentsRoutes;



