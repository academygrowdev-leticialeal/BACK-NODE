let num1 = 9;
let num2 = 3;

// Aritméticos
// Adição, subtração, multiplicação, divisão (inteira e de módulo) e exponenciação

const soma = 10 + 20; // 30
// console.log(soma);

const subtracao = 10 - 20; // -10
// console.log(subtracao);

const multiplicacao = 2 * 5 // 10
// console.log(multiplicacao);

const divisaoInteira = 10 / 2; // 5
const divisaoFracionada = 5 / 2; // 2.5
// console.log(divisaoInteira);
// console.log(divisaoFracionada);

const restoDaDivisao = 5 % 2; // 1
// console.log(restoDaDivisao);

const potencia = 4 ** 2; // 16
// console.log(potencia);

// Incremento (sempre de 1 em 1)
num1++;
console.log(num1);

// Decremento (sempre de 1 em 1)
--num2;
console.log(num2);



// Atribuição
// = -> atribuição
// += -> atribuição da soma
// -=
// *=
// /=
// %=
// **=
let resultado = num1 + num2; // 12

// resultado = resultado + 8;
resultado += 8;
console.log(resultado) // 20

// resultado = resultado - 5;
resultado -= 5;
console.log(resultado) // 15

// resultado = resultado * 2; 
resultado *= 2
console.log(resultado) // 30

// resultado = resultado / 10;
resultado /= 10;
console.log(resultado) // 3

// resultado = resultado % 2;
resultado %= 2;
console.log(resultado) // 1

// resultado = resultado ** 3;
resultado **= 3;
console.log(resultado) // 1


// Operadores Relacionais
// Dica: SEMPRE SERÁ UM RESULTADO LÓGICO
// esquerda > direita maior que
// < menor que
// >= maior ou igual
// <= menor ou igual
// == igual
// === estrtitamente igual
// != diferente
// !== estritamente diferente
const maior = num1 > num2; // 10 > 2 ? SIM 
console.log(maior);

const menor = num1 < num2; // 10 < 2 ? NÃO
console.log(menor);

const maiorOuIgual = num1 >= 11;
// 10 > 11 ? NÃO
// 10 == 11 ? NÃO
// resultado é NÃO (false)
console.log(maiorOuIgual);


const menorOuIgual = 20 <= 11;
// 20 < 11 ? NÃO
// 20 == 11 ? NÃO
// resultado é NÃO (false)
console.log(menorOuIgual);


// BOAS PRÁTICAS - uso do estritamente sempre que possível

// 10 é igual em valor e tipo que 2?
// 10 é igual em valor e tipo que "10"?
const igual = num1 === num2; // 10 === 2 ? NÃO
const igualEx2 = num1 === "10"; // 10 === "10" ? NÃO
console.log(igual);
console.log(igualEx2);

const diferente = num1 !== num2; // 10 !== 2? SIM
const diferenteEx2 = num1 !== "10"; // 10 !== "10" ? SIM
console.log(diferente);
console.log(diferenteEx2);

// Igualdade (==) valida apenas o valor, não se importa com o tipo
const igualEx3 = num1 == "10"; // 10 == "10" ? SIM
console.log(igualEx3);

// Diferença (!=) valida apenas o valor, não se importa com o tipo
const diferenteEx3 = num1 != "2"; // 10 != "2" ? SIM
console.log(diferenteEx3);


// Operadores lógicos
// AND (expressaoEsquerda && expressaoDireita)
// restritivo
// SIM && SIM => SIM
// NAO && SIM => NAO
// SIM && NAO => NAO
// NAO && NAO => NAO
const resultadoAnd = (num1 > num2) && (num1 !== num2);
console.log(resultadoAnd);


// OR (expressaoEsquerda || expressaoDireita)
// permissivel
// SIM || SIM => SIM
// NAO || SIM => SIM
// SIM || NAO => SIM
// NAO || NAO => NAO
const resultadoOr = (num1 < num2) || (num1 === num2);
console.log(resultadoOr);


// NOT (!expressao)
// Não verdadeiro => falso
// Não falso => verdadeiro
console.log(!resultadoOr);
console.log(!resultadoAnd);

const nome = window.prompt("Digite o nome: ")

// se !nome então diz que ta errado
if (!nome) {
    console.log("Informar o nome é obrigatório");
}

// se nome então diz que ta certo
if (nome) {
    console.log(nome);
}

// DICA
// "", null, undefined, false, 0 => tudo isso equivale à false para o JS












