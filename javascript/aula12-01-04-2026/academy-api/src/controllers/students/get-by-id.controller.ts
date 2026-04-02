import type { Request, Response } from "express";
import httpResponse from "../../utils/http-response";
import { prisma } from "../../database/prisma";


export default async function getStudentsById(req: Request, res: Response) {
    try {
        const { id } = req.params;

        if (!id || typeof id !== "string") {
            return httpResponse(res, 400);
        }

        const studentFound = await prisma.aluno.findUnique({
            where: {
                id,
                perfil: { ativo: true }
            },
            include: {
                perfil: {
                    omit: { criadoEm: true, atualizadoEm: true }
                }
            },
            omit: {
                perfilId: true,
            }
        });

        if (!studentFound) return httpResponse(res, 404);

        return httpResponse(res, 200, studentFound);
    } catch (error) {
        console.error(error);
        return httpResponse(res, 500);
    }
}