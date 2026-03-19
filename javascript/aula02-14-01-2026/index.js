// Estruturas Condicionais

// Condicionais simples
// Testar uma única condição para desvio do fluxo de execução

// verificar SE um determinado número/variavel é maior que X
// SE condição é verdadeira então faça tal ação
// const idade = Number(window.prompt("Informe sua idade: "));
// const possuiDinheiro = true;

// if (idade > 18) {
//     // IMPORTANTE: aqui só executa se a condição for TRUE
//     alert(`Você é maior de idade`);
// } else {
//     // IMPORTANTE: aqui só executa se a condição for FALSE
//     alert(`Você não pode acessar a aplicação`);
// }


// Encadeadas/aninhado
// if (idade >= 18 && possuiDinheiro) {
//     alert("Está habilitado para tirar a carteira de motorista");
// } else if (idade >= 18) {
//     alert("Junte dinheiro e volte mais tarde");
// } else if (possuiDinheiro) {
//     alert("Complete maior idade e volte mais tarde");
// } else {
//     alert("Não será possivel tirar a CNH. Você não possui nem idade nem dinheiro")
// }

// const categoriaProduto = "eletrodoméstico"
// Múltipla escola
// switch case
// Equiparando igualdades de preferencia de forma estrita
// === -> IGUAL EM VALOR E TIPO
// switch (categoriaProduto) {
//     // Caso o valor da variavel seja igual à
//     case "Eletrônico":
//     case "Eletrodoméstico":
//         console.log(categoriaProduto)
//         break;
//     case "Portáteis":
//         // execute o processo escrito aqui
//         break;
//     case "Roupas":
//         // execute o processo escrito aqui
//         break;
//     default: // equivalente ao else
//     // execute o processo escrito aqui
// }

// if (categoriaProduto === "Eletrônico") {
//     // execute o processo escrito aqui
// } else if (categoriaProduto === "Portáteis") {
//     // execute o processo escrito aqui
// } else if (categoriaProduto === "Roupas") {
//     // execute o processo escrito aqui
// } else {
//     // execute o processo escrito aqui
// }


// Receba um número do usuário e verifique
// a ) Se o número é par ou impar
// b) Se o número é inteiro
// c) Se o número é positivo
// d) Se for par, inteiro e positivo mostre um emoji para o usuario

// const numero = Number(window.prompt("Digite um número: "));

// a ) Se o número é par ou impar
// if (Number.isInteger((numero % 2))) {
//     if (numero % 2 === 0) {
//         console.log("O número é par!")
//     } else {
//         console.log("O número é impar!")
//     }
// }

// if (Number.isInteger((numero % 2)) && (numero % 2) === 0) {
//     console.log("O número é par!")
// } else if (Number.isInteger((numero % 2)) && numero % 2 === 1) {
//     console.log("O número é impar!")
// }

// b) Se o número é inteiro
// if (Number.isInteger(numero)) {
//     console.log("O número é inteiro!")
// }

// if (numero > 0) {
//     console.log("O número é positivo!")
// }


// if (Number.isInteger(numero) && numero % 2 === 0 && numero > 0) {
//     console.log("☝️");
// }


// Construa uma calculadora
// O usuario informa a operação que deseja e os números que serão calculados

// const operacao = window.prompt("Informe o caracter da operação (+, -, * ou /");
// const numero1 = Number(window.prompt("Informe o número 1"));
// const numero2 = Number(window.prompt("Informe o número 2"));


// switch (operacao) {
//     case "+":
//         console.log(numero1 + numero2);
//         break;
//     case "-":
//         console.log(numero1 - numero2);
//         break;
//     case "*":
//         console.log(numero1 * numero2);
//         break;
//     case "/":
//         console.log(numero1 / numero2);
//         break;
//     default:
//         console.log("Operação inválida. Tente novamente");
// }


// Estruturas de Repetição
// Repetir um conjunto de instruções por quantas vezes forem necessárias

// Repetições por número definido de vezes
// for

// for(declaração da variavel de controle; teste lógico para saber se continua repetindo; modificação da variavel de controle - incremento ou decremento) {


// }
// const numero = Number(prompt("Digite o número que deseja ver a tabuada: "));

// for (let controle = 1; controle <= 10; controle++) {
//     console.log(`${numero} x ${controle} = ${numero * controle}`);
// }


// Repetições por número indefinido de vezes
// while e do while
// const numeroAleatorio = 8;
// let input = Number(prompt("Advinhe o numero sorteado: "));
// let contador = 1;

// Só executa o bloco de código se o teste resulta em true
// while (input !== numeroAleatorio) {
//     console.log("você errou. Tente novamente");

//     input = Number(prompt("Advinhe o numero sorteado: "));
//     contador++;
// }

// Executa o bloco de código ao menos 1 vez, mesmo que o teste resulte em false
// do {
//     console.log("você errou. Tente novamente");

//     input = Number(prompt("Advinhe o numero sorteado: "));
//     contador++;
// } while (input !== numeroAleatorio)

// console.log("Parabéns! Você acertou o número sorteado!");
// console.log(`Quantidade de tentativas: ${contador}`);


// let opcao = "";

// do {
//     console.log("Informe a opção desejada");
//     console.log("comprar\nfechar pedido\nsair");
//     opcao = prompt("Digite a opção desejada");
// } while (opcao !== "sair")




// Função - fazer algo em específico

// Processo - algo que é executado e não possui um retorno
// funções sem retorno
// Definir/declarar a função é diferente de executa-la!

// 1 - Define
function mostrarBoasVindas(usuario, emoji) { // parâmetros
    console.log(new Date());
    alert(`Seja bem vindo ${usuario} à plataforma! ${emoji}`);
}

// 2 - Executa
const input = prompt("Informe seu nome");
mostrarBoasVindas(input, "🎉") // argumentos




// Função - algo que é executado e possui um retorno
// funções com retorno
function somar(num1, num2) {
    const resultado = num1 + num2;

    return resultado
}

function calcular(operacao, num1, num2) {
    switch (operacao) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        default:
            console.log("Operação inválida!");
    }

    console.log("Tente de novo!");
}

console.log(calcular("**", 10, 2));



// // Muito usadas como callbacks
// (function () {
//     mostrarBoasVindas();
// }) ()


// ARROW FUNCTION
// const somar = () => { }








