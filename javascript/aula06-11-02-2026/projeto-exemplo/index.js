const { AxiosError } = require("axios");

const axios = require("axios").default; // commonjs
// import axios from 'axios' // module


(async function () {
    // Client HTTP - fetch(nativo) ou axios (lib externa)
    const resultado = await cadastrarLivro({
        title: "A vida feliz",
        resume: "Livro de filosofia estoica de Sêneca.",
        totalPages: 250,
        isFavorite: false,
        authorId: "10c69b15-767f-487f-9b1c-68555a2b3f06"
    });

    if (!resultado.ok) {
        console.log(resultado.message)
        return
    }

    console.log(resultado.data) // Pq esta sendo acessado resultado.data?


})()

async function listarLivros() {
    try {
        const response = await axios.get("https://books-api-j138.onrender.com/books");

        // Onde fica o body? response.data
        return response.data; // { ok: true, message: "", data: [{...}]}
    } catch (error) {
        // O que a aplicação precisa fazer quando der erro de comunicação externa
        return {
            ok: false,
            message: "Erro de comunicação externa"
        }

    }
}

async function cadastrarLivro(novoLivro) {
    try {
        const response = await axios.post("https://books-api-j138.onrender.com/books", novoLivro)

        return response.data; // body
    } catch (error) {
        console.log(error)
    }
}
