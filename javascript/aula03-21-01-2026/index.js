
// Processo - funções que não possuem retorno
// só executam algo
// Uma função deve ser responsável por apenas 1 coisa

// Declaração da função != da execução da função
// function somar(num1, num2) {


//     return num1 + num2
// }

// argumentos != parametros
// console.log(somar(10, 2)) // execução da função

//




// https://developer.mozilla.org/pt-BR/docs/Glossary/IIFE
(function () {
    //...
    //..
    // Função
    function somar(num1, num2) {
        return num1 + num2
    }


    // Funções anônimas

    // Arrow functions
    // Recurso 1: retorno implicito quando a lógica se resume a uma única instrução de retorno
    const subtrair = (num1, num2) => num1 - num2;


    // Recurso 2: quando a função possui um único parametro, os parenteses são OPCIONAIS
    const boasVindas = nomeUsuario => console.log(`Hello, ${nomeUsuario}`);

    console.log(subtrair(10, 2))
    boasVindas("Pedro")


    const multiplicar = function (num1, num2, mostraResultado) {
        const resultado = num1 * num2;

        mostraResultado(resultado)
        return num1 * num2
    }


    // callback -> funções anômimas que são enviadas como argumentos para outras função
    multiplicar(5, 2, (result) => console.log(result))

})()






