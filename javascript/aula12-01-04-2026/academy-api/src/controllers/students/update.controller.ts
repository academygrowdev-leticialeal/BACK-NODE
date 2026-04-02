import type { Request, Response } from "express";
import httpResponse from "../../utils/http-response";
import type IStudent from "../../types/student";
import { prisma } from "../../database/prisma";

export default async function updateStudent(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { primeiroNome, sobrenome, nomeSocial, telefone, dataNascimento } = req.body;

        if (!id || typeof id !== "string") {
            return httpResponse(res, 400);
        }

        const alunoEncontrado = await prisma.aluno.findUnique({
            where: { id, perfil: { ativo: true } },
        });

        if (!alunoEncontrado) {
            return httpResponse(res, 404);
        }

        const perfilAtualizado = await prisma.pessoa.update({
            where: { id: alunoEncontrado.perfilId },
            data: {
                primeiroNome,
                sobrenome,
                nomeSocial,
                telefone,
                dataNascimento
            },
            omit: {
                criadoEm: true,
                atualizadoEm: true
            }
        })

        return httpResponse(res, 200, {
            ...alunoEncontrado,
            perfilId: undefined,
            perfil: perfilAtualizado
        });
    } catch (error) {
        console.error(error);
        return httpResponse(res, 500);
    }
}