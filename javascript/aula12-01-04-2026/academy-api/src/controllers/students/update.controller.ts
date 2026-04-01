import type { Request, Response } from "express";
import { readDb, writeDb } from "../../database/db";
import httpResponse from "../../utils/http-response";
import type IStudent from "../../types/student";

export default async function updateStudent(req: Request, res: Response) {
    try {
        const { students } = await readDb();
        const { id } = req.params;
        const { name, email, birthDate } = req.body;

        const studentList = [...students];

        // buscar um valor de dentro de um array que atenda a uma condição
        const studentIndex = studentList.findIndex((student) => `${student.id}` === id); // 10 == '10';

        if (studentIndex === -1) return httpResponse(res, 404);

        // PUT -> é obrigatório atualizar todas as props ou onde pode atualizar, mas não é obrigatório
        // PATCH -> atualiza uma única propriedade do recurso ou um toggle em uma prop (estados de um registro)
        // 'ADMIN' ou 'USER'
        const studentUpdated = {
            ...studentList[studentIndex], // como copiar props e valores de um objeto { id: 1, isEnabled: true, ...}
            name: name || studentList[studentIndex]!.name, //   <esquerdo> !== "", undefined, null, 0, false || <direito>
            email: email || studentList[studentIndex]!.email,
            birthDate: birthDate || studentList[studentIndex]!.birthDate
        } as IStudent

        studentList.splice(studentIndex, 1, studentUpdated); // studentList[studentIndex] -> studentUpdated

        await writeDb({ students: studentList });

        return httpResponse(res, 200, studentUpdated);
    } catch (error) {
        console.error(error);
        return httpResponse(res, 500);
    }
}