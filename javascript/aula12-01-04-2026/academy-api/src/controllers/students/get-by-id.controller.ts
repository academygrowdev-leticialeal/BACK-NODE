import type { Request, Response } from "express";
import { readDb } from "../../database/db";
import httpResponse from "../../utils/http-response";


export default async function getStudentsById(req: Request, res: Response) {
    try {
        const { students } = await readDb();

        const { id } = req.params;

        if (typeof id === 'string') {
            // buscar um valor de dentro de um array que atenda a uma condição
            const studentFound = students.find((student) => `${student.id}` === id);

            if (!studentFound) return httpResponse(res, 404);

            return httpResponse(res, 200, studentFound);
        }

        // buscar um valor de dentro de um array que atenda a uma condição
        // const studentFound = students.find((student) => student.id == id);

        // if (!studentFound) return httpResponse(res, 404);

        // return httpResponse(res, 200, studentFound);
    } catch (error) {
        console.error(error);
        return httpResponse(res, 500);
    }
}