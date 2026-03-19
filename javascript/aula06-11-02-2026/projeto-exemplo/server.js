const express = require('express') // builder

const app = express()
app.use(express.json()); // body parser

const port = 3000

const alunos = [];
// ID, nome, email, data nascimento

// Declaração de recursos e suas respectivas rotas de respostas

// CRUD
// Cadastrar - ✅
// Listar ou obter - ✅
// Atualizar
// Excluir

// GET -> http://localhost:3000
app.post("/students", (request, response) => {
    // 1 - input
    const dadosBody = request.body; // {} ou undefined

    // 2 - processing

    // Garanto que foi enviado as propriedades que preciso no body
    if (!dadosBody || !dadosBody?.name || !dadosBody?.email || !dadosBody?.birthDate) {
        return response.status(400).json({
            message: "É obrigatório informar name, email e birthDate"
        })
    }

    // Garantir que os dados estão nos formatos e tipos adequados
    if (typeof dadosBody.name !== "string") {
        return response.status(400).json({
            message: "Name deve ser uma string"
        })
    }

    if (typeof dadosBody.email !== "string" || !dadosBody.email.includes("@")) {
        return response.status(400).json({
            message: "Email deve ser uma string e um email válido"
        })
    }


    if (typeof dadosBody.birthDate !== "string") {
        return response.status(400).json({
            message: "BithDate deve ser uma string"
        })
    }

    // "dd/MM/yyyy" => pt-BR
    // Abstrair toda a lógica abaixo - date-fns
    const [dia, mes, ano] = dadosBody.birthDate.split("/");
    // Dias válidos 1 - 31
    const diaInvalido = !dia || dia?.length !== 2 || Number(dia) > 31 || Number(dia) < 1;

    // Meses válidos 1 - 12
    const mesInvalido = !mes || mes?.length !== 2 || Number(mes) > 12 || Number(mes) < 1;

    // Ano válidos 1900 - 2026
    const anoInvalido = !ano || ano?.length !== 4 || Number(ano) > 2026 || Number(ano) < 1900;

    if (diaInvalido || mesInvalido || anoInvalido) {
        return response.status(400).json({
            message: "BithDate deve ser uma data válida"
        })
    }

    const proxId = alunos.length ? (alunos[alunos.length - 1].id + 1) : 1;
    // Sugestões de melhorias - Pesquisar libs que gerem IDs aleatórios e unicos
    // Também dá pra usar timestamp

    const novoAluno = {
        id: proxId, // new Date().getTime()
        name: dadosBody.name,
        email: dadosBody.email,
        birthDate: dadosBody.birthDate
    }

    alunos.push(novoAluno);

    // 3 - output - Para toda request DEVE existir uma response - HTTP
    return response.status(201).json(novoAluno) // {}

})


app.get('/students', (request, response) => {
    // 1 - input
    const filtros = request.query;

    // 2 - processing
    let listaFiltrada = [...alunos];

    // Name e email e birth
    if (filtros?.name) {
        listaFiltrada = listaFiltrada.filter((aluno) => aluno.name.includes(filtros.name))
    }

    if (filtros?.email) {
        listaFiltrada = listaFiltrada.filter((aluno) => aluno.email.includes(filtros.email))
    }

    if (filtros?.birthDate) {
        listaFiltrada = listaFiltrada.filter((aluno) => aluno.birthDate === filtros.birthDate)
    }


    // 3 - output
    return response.status(200).json(listaFiltrada) // []
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
