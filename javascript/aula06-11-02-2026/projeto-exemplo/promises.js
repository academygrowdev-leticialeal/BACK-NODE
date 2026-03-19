
    // let resultado; // undefined

    // const promiseResultado = axios.get("https://books-api-j138.onrender.com/books");

    // Promises - Pending enquanto houver thens sendo executados
    // promiseResultado
    //     .then((resposta) => {
    //         return resposta.data // resposta.data = body

    //         // qualquer processamente deve ser feito aqui
    //     }) // fullfiled 
    //     .then((body) => {
    //         // tratar os dados e retornar um mapeamento
    //         return body.data.map((livro) => livro.titulo.toUpperCase()) // TypeError => toUpperCase is not a function
    //     })// fullfiled 
    //     .then((titulos) => {
    //         console.log(titulos)
    //         resultado = titulos // pq isso não funciona?
    //     }) // fullfiled 
    //     .catch((erro) => {
    //         // Capturar erros de request - Qualquer erro da API - Axios
    //         if (erro instanceof AxiosError) {
    //             // aqui deve ser feita a lógica que trata o erro da request
    //             // 404 ?
    //             // 500 ?
    //             // 400 ?
    //         }

    //         // Capturar erros de lógica e codificação
    //         if (erro instanceof TypeError) {
    //             console.log(erro.message)
    //         }

    //     }) // rejected



    // console.log(resultado)  // pq continua sendo undefined? Rode no modo debug para entender!