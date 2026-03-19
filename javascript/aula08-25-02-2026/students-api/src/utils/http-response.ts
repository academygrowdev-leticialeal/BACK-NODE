import type { Response } from "express";

enum MessageEnum {
    'Operação realizada com sucesso' = 200,
    'Registro cadastrado com sucesso' = 201,
    'Registro não encontrado' = 404,
    'Requisição inválida. Verifique os parametros e tente novamente' = 400,
    'Registro duplicado.' = 409,
    'Ops! Ocorreu um erro inesperado no servidor.' = 500
}


// Tipos dinâmicos - dinamic//generic types
export default function httpResponse<T>(res: Response, statusCode: number, data?: T) {
    return res.status(statusCode).json({
        ok: false,
        message: MessageEnum[statusCode],
        data: data
    });
}