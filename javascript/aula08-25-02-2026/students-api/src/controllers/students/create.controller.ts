import type { Request, Response } from "express";
import { readDb, writeDb } from "../../database/db";
import httpResponse from "../../utils/http-response";
import type { PartialStudent } from "../../types/partial-student";



export default async function createStudent(req: Request, res: Response) {
    try {
        const { students } = await readDb();
        const { name, email, birthDate } = req.body as PartialStudent; // utilities types

        // REGRA DE NEGÓCIO
        if (students.some((student) => student.email === email)) {
            return httpResponse(res, 409);
        }


        const newStudent = {
            id: new Date().getTime(),
            name: name,
            email,
            birthDate
        }

        const studentsList = [...students, newStudent]; // .push()

        await writeDb({ students: studentsList });

        return httpResponse(res, 201, newStudent);
    } catch (error) {
        console.error(error);
        return httpResponse(res, 500);
    }
}