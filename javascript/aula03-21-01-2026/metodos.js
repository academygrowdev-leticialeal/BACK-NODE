

// String
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String


// Number
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number


// Arrays / Listas
// https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Arrays

const compras = [
    'Maça',
    'Banana',
    'Arroz',
];

// Adição ou remoção de valores em uma array
// Adicionar - push, unshift
// push add sempre AO FINAL do array
compras.push('Feijão', 'Farinha', 'Carne')
// console.log(compras)

// unshift add sempre AO INICIO do array
compras.unshift('Pão de queijo', 'Goiabada')
// console.log(compras)


// Remover - pop, shift
// pop remove o ultimo item e retorna esse item removido
const ultimoItemRemovido = compras.pop()
// console.log(ultimoItemRemovido)


// shift remove o primeiro item e retorna esse item removido
const itemRemovido = compras.shift()
// console.log(itemRemovido)



// Filter - filtrar uma lista por uma condição adicionada. Todos os itens que atenderem a condição serão adicionados à nova lista resultante

const listaFiltrada = compras.filter((item) => item.startsWith('F'));

const notas = [
    10,// 0
    8.9, // 1
    7, // 2
    6 // 3
];

const notasFiltradas = notas.filter((nota) => nota < 7);
// console.log(notasFiltradas);

// Principais Métodos de Arrays - find e findIndex

// find - busca um valor dentro de uma lista que atenda a uma determinada condição, se não encontrar, devolve undefined

// findIndex - busca um indice dentro de uma lista que atenda a uma determinada condição, se não encontrar, devolve -1

const itemEncontrado = compras.find((item) => item === 'Maça');
// console.log(itemEncontrado)


const indiceEncontrado = compras.findIndex((item) => item === 'Maça');
// console.log(indiceEncontrado)

// Principais Métodos de Arrays - some e every
// some - busca algum item que atenda a uma determinada condição e retorna true se encontrar (ao menos 1)

const existe = compras.some((item) => item.length >= 25);
const atendemACondicao = compras.every((item) => item.startsWith("F"));
// console.log(atendemACondicao)


// forEach - serve para executar alguma lógica para cada item da lista. NÃO POSSUI RETORNO, se substituido o valor de cada item irá alterar a lista original
compras.forEach((item) => {
    // Só executa um mesmo processo para cada item da lista
    console.log(item.toUpperCase())
})


// map - criar uma nova lista de mesmo tamanho com os valores modificados/mapeados
const novaLista = compras.map((item) => {
    return {
        nomeProduto: item,
        estoque: 0
    }
});

console.log(novaLista)


const listaAlunos = [
    {
        nome: "João",
        notas: [
            {
                disciplina: "Fundamentos Programação",
                valor: 10
            }, // [0]
            {
                disciplina: "HTML",
                valor: 7
            } // [1]
        ]
    },
    {
        nome: "Maria",
        notas: [
            {
                disciplina: "Fundamentos Programação",
                valor: 5
            },
            {
                disciplina: "HTML",
                valor: 4.5
            }
        ]
    }
]


// (0 + 10) = 10
// (10 + 7) = 17
// callback, initialValue (para quando o array não possui nenhum item)
const mediaJoao = listaAlunos[0].notas.reduce((resultado, item, index, array) => {
    // deve retornar o novo valor para "resultado"/"acc"

    const soma = resultado + item.valor

    if (index === (array.length - 1)) {
        return soma / array.length // retorna a média
    }


    return soma // retorna apenas a soma dos itens
}, 0)

console.log(mediaJoao)

// const mediaJoao = somaNotas / listaAlunos[0].notas.length

/*

Principais Métodos de Arrays - push, unshift, pop, shift
Principais Métodos de Arrays - filter
Principais Métodos de Arrays - find e findIndex
Principais Métodos de Arrays - some e every
Principais Métodos de Arrays - forEach e map
Principais Métodos de Arrays - reduce



Principais Métodos de Arrays - slice e splice
Principais Métodos de Arrays - reverse, join e includes
Principais Métodos de Arrays - sort


*/
