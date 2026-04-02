import type { Request, Response } from "express";
import httpResponse from "../../utils/http-response";
import { prisma } from "../../database/prisma";
import bcrypt from 'bcrypt';



export default async function createStudent(req: Request, res: Response) {
    try {
        const { primeiroNome, sobrenome, nomeSocial, email, telefone, dataNascimento } = req.body;

        // REGRA DE NEGÓCIO
        const pessoaCadastrada = await prisma.pessoa.findUnique({
            where: {
                email: email,
            }
        });

        if (pessoaCadastrada) {
            return httpResponse(res, 409);
        }

        /*
            SELECT * FROM pessoas WHERE email = "email@teste.com"
        
        */


        // rodar transações
        const alunoCadastrado = await prisma.$transaction(async (tx) => {
            // Cadastrar o perfil
            const novoPerfil = await tx.pessoa.create({
                data: {
                    primeiroNome: primeiroNome,
                    sobrenome,
                    email,
                    telefone,
                    dataNascimento,
                    nomeSocial,
                }
            });

            const codigoMatricula = (await bcrypt.hash(new Date().getTime().toString(), 10)).slice(-10);

            const novoAluno = await tx.aluno.create({
                data: {
                    codigoMatricula,
                    perfilId: novoPerfil.id
                },
                include: {
                    perfil: {
                        omit: {
                            criadoEm: true,
                            atualizadoEm: true
                        }
                    }
                },
                omit: {
                    perfilId: true,
                }
            })

            return novoAluno
        });


        return httpResponse(res, 201, alunoCadastrado);
    } catch (error) {
        console.error(error);
        return httpResponse(res, 500);
    }
}