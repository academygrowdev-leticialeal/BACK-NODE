import type { Request, Response } from "express";

import httpResponse from "../../utils/http-response";
import { prisma } from "../../database/prisma";

export default async function deleteStudent(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id || typeof id !== "string") {
            return httpResponse(res, 400);
        }

        // SOFT DELETE
        // const alunoAtivo = await prisma.aluno.findUnique({
        //     where: {
        //         id: id,
        //         perfil: {
        //             ativo: true
        //         }
        //     }
        // });

        // if (!alunoAtivo) {
        //     return httpResponse(res, 404);
        // }

        // await prisma.pessoa.update({
        //     where: { id: alunoAtivo.perfilId },
        //     data: { ativo: false }
        // });

        // NÃO ESTÁ COM CASCADING na relação?
        // Tem que excluir primeiro o aluno (que é onde tem a FK) e depois o Perfil que é quem é referenciado
        const studentDeleted = await prisma.$transaction(async (tx) => {
            const alunoExcluido = await tx.aluno.delete({ where: { id } })

            await tx.pessoa.delete({ where: { id: alunoExcluido.perfilId } })

            return alunoExcluido
        });

        // ESTÁ COM CASCADING na relação?
        // const aluno = await prisma.aluno.findUnique({ where: { id } })

        // if (!aluno) {
        //     return httpResponse(res, 404);
        // }

        // await prisma.pessoa.delete({ where: { id: aluno.perfilId } })

        return httpResponse(res, 200, studentDeleted);
    } catch (error) {
        console.error(error);
        return httpResponse(res, 500);
    }
}