let valorSaque = 255;

/*
Olá, Danilo aqui!
Criar um array pra armazenar as informações de valores
Valores: 50, 10, 5, 1
*/
const notasDisponiveis = [50, 10, 5, 1];

/**
 * Criar Map pra armazenar resultado
 */


/**
 * Percorrer o array inicial e verificar
 * Variaveis = Verificar quantas x o número pelo valor da chave
 * Variaveis = Verificando o que sobrou
 */

const map = new Map();
map.set(50, 0);
map.set(10, 0);
map.set(5, 0);
map.set(1, 0);

for (let i = 0; i < 4; i++) {
    const cedulaAtual = notasDisponiveis[i];
    const qtdCedulas = Number((valorSaque / cedulaAtual).toString().slice(".")[0]);
    const valorFaltaPagar = valorSaque % cedulaAtual;

    if (qtdCedulas > 0 && valorSaque >= cedulaAtual) {

        const valorAtualLoop = map.get(cedulaAtual);

        if (valorAtualLoop === 0) {
            map.set(cedulaAtual, qtdCedulas);
            valorSaque = valorFaltaPagar;

        }
        valorSaque = valorFaltaPagar;
    }
};

/*
    GC$ 50,00 -> 1
    GC$ 10,00 -> 2
    GC$ 5,00  -> 0
    GC$ 1,00  -> 2
*/
map.forEach((value, key, map) => {
    console.log(`GC$ ${key.toFixed(2)} -> ${value}\n`)
})
