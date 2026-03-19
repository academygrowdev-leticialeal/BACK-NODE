// // ESCOPO - Global
// const nomeUsuario = "Leticia"
// const emailUsuario = "leticia.leal@growdev.academy"
// const idadeUsuario = 17


// // Acessar = ler/sobrescrever(se aplicável)
// if (idadeUsuario < 18) {
//     // ESCOPO - De bloco/local
//     // contexto do SIM para a validação lógica
//     const ativo = false


//     console.log(`${nomeUsuario} você é menor de idade`)
//     console.log(ativo);
// }


// function validaUsuario() {
//     console.log(`${nomeUsuario} você é menor de idade`)
// }


// validaUsuario()


let carrinhoCompras = [
    'Maça',
    'Banana',
    //[]
    //[]
];


function addProdutoAoCarrinho(novoProduto) {
    // spread operator - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

    // copia o valor e também a referencia em memória
    // const tmpCarrinho = carrinhoCompras; 


    // copia somente os valores do array/objeto
    // const tmpCarrinho = [...carrinhoCompras]; 

    carrinhoCompras = [...carrinhoCompras, novoProduto]; // modificando a variavel global
}


function main() {
    const produto = prompt("Digite o produto à add na lista de compras:");

    addProdutoAoCarrinho(produto)

    console.log(carrinhoCompras); // lendo a variável global
}





