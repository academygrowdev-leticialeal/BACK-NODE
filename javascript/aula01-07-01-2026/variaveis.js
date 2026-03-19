// 1 - Input
// Dado é tudo que o app precisa pra poder executar o que deve executar

// DADOS PRIMITIVOS
// textual (string) -> letras, números, caracteres especiais, emojis, etc
// let e const 
// const nome = window.prompt("Digite seu nome: ");
// console.log(nome);

// const frase = window.prompt("Digite uma frase qualquer: ");
// console.log(frase);

// const inputUsuarioIdade = window.prompt("Digite sua idade: ");
// console.log(inputUsuarioIdade);

// OBS: todo e qualquer entrada de dado do usuário, seja ela por input na pagina html, seja pelo prompt do navegador, seja pelo promtp do terminal, SEMPRE SERÁ UMA STRING


// numérico (number) -> inteiros como decimais (com ou sem casas depois da virgula)
// serve para operações aritméticas
// casting -> conversão de um tipo para outro tipo
// const idade = parseInt(window.prompt("Digite sua idade"));
// console.log(idade);


// const preco = parseFloat(window.prompt("Digite so preço do produto: "));
// console.log(preco);


// const quantidadeEstoque = Number(window.prompt("Digite so preço do produto: "));
// console.log(quantidadeEstoque);

// conversão dos valores falsy 
// "", null, undefined, false => 0

// const peso = 78.89;


// booleano (boolean) -> verdadeiro ou é falso (true ou false)
// serve para operações lógicas
// const estaAtivo = window.confirm("O usuário está ativo?");
// console.log(estaAtivo);


// const matriculado = false;
// const finalizarApp = true;

// indefinido (undefined) -> existe mas não se definiu qual o dado
// let diaAula;

// nulo (null) -> não existe
// const A = null;


// DADOS ESTRUTURADOS
// listas (array) -> conjunto de dados do mesmo tipo
const nomes = ["Leticia", "James", "Nathalia"];

const idades = [30, 18, 20];

const matriculas = [false, true, true];


// objetos (literais) -> conjunto de dados sobre uma mesma coisa, onde cada dado pode ser de um tipo diferente
const usuario = {
    nome: "Leticia",
    idade: 30,
    ativo: true,
    listaNotas: [
        {
            disciplina: "Javascript",
            nota: 10
        },
        {
            disciplina: "APIs",
            nota: 8
        }
    ]
};

// usuario.nome = window.prompt("Digite seu nome: ");

// usuario.idade = Number(window.prompt("Digite sua idade: "));

// usuario.ativo = window.confirm("Está ativo no sistema? ");

const output = `Sua nota na disciplina ${usuario.listaNotas[1].disciplina} é ${usuario.listaNotas[1].nota}`;

const frase = "Leticia vulgo \"Lê\"";

console.log(output);




// 2 - Processamento

// 3 - Output


