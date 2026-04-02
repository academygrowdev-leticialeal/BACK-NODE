
import type { Request, Response } from "express";
import httpResponse from "../../utils/http-response";
import { prisma } from "../../database/prisma";
import { PessoaWhereInput } from "../../../generated/prisma/models";

export default async function listAllStudents(req: Request, res: Response) {
    try {

        const filtros: PessoaWhereInput = {};

        if (typeof req?.query?.primeiroNome === "string") {
            filtros.primeiroNome = {
                mode: "insensitive",
                contains: req.query.primeiroNome
            }
        }

        if (typeof req?.query?.email === "string") {
            filtros.email = {
                mode: "insensitive",
                contains: req.query.email
            }
        }

        if (typeof req?.query?.birthDate === "string") { // "1995-12-02"
            filtros.dataNascimento = req.query.birthDate
        }

        const studentsFiltered = await prisma.aluno.findMany({
            where: { perfil: filtros }
        });


        return httpResponse(res, 200, studentsFiltered);
    } catch (error) {
        console.error(error);
        return httpResponse(res, 500);
    }
}