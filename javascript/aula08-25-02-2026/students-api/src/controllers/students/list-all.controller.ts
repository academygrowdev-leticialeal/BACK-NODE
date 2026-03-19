

// Controller: receber a solicitação(request) e respondê-la de acordo(response)

import type { Request, Response } from "express";
import { readDb } from "../../database/db";
import type { PartialStudent } from "../../types/partial-student";
import httpResponse from "../../utils/http-response";

export default async function listAllStudents(req: Request, res: Response) {
    try {
        const { students } = await readDb();

        let studentsFiltered = [];

        if (!req.query) {
            studentsFiltered = [...students];
        } else {
            //.. aplica os filtros conforme veio
            // name, email, birthDate
            const query = req.query as Partial<PartialStudent>;

            studentsFiltered = students.filter((student) => {
                // name, email, birthDate
                const searchResult = []; // [true, true, true] => atende à todas as condições

                // req.query.name, req.query.email, req.query.birthDate, req.query.firstName, req.query.age
                for (const propriedade in query) {
                    // validar se essa prop enviada no query é uma prop valida do meu objeto aluno

                    const keys = Object.keys(student); // ["name", "id", "email", "birthDate"]

                    if (keys.includes(propriedade) && req.query[propriedade]) { // student.email && req.query.email
                        const isMatch = (student as any)[propriedade].includes(req.query[propriedade]);
                        searchResult.push(isMatch);
                    }
                }

                // se nenhuma prop for válida, mantem o registro na listagem
                if (!searchResult.length) return true;

                return searchResult.every((bool) => bool)
            })
        }


        return httpResponse(res, 200, studentsFiltered);
    } catch (error) {
        console.error(error);
        return httpResponse(res, 500);
    }
}