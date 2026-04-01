import type { Request, Response } from "express";
import { readDb, writeDb } from "../../database/db";
import httpResponse from "../../utils/http-response";

export default async function deleteStudent(req: Request, res: Response) {
    try {
        const { students } = await readDb();
        const { id } = req.params;

        const studentList = [...students];

        // buscar um valor de dentro de um array que atenda a uma condição
        let studentIndex = studentList.findIndex((student) => `${student.id}` === id);

        if (studentIndex === -1) return httpResponse(res, 404);

        const [studentDeleted] = studentList.splice(studentIndex, 1);

        await writeDb({ students: studentList });

        return httpResponse(res, 200, studentDeleted);
    } catch (error) {
        console.error(error);
        return httpResponse(res, 500);
    }
}