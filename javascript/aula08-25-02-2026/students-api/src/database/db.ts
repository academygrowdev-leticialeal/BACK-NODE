import fs from 'fs/promises';
import path from 'path';
import type IStudent from '../types/student';

// Leitura de arquivos do sistema
// const __fileUrl = import.meta.url;
// const __filePath = fileURLToPath(__fileUrl);
// const __dirname = path.dirname(__filePath);

interface IDataJson {
    students: IStudent[];
};

const dbFilePath = path.join(__dirname, 'data.json');


// Ler arquivo
export async function readDb() {
    const data = await fs.readFile(dbFilePath, { encoding: 'utf8' });

    return JSON.parse(data) as IDataJson; // converte uma string para o formato original
}



// Escrever no arquivo
// Tipos anonimos e tipos nomeados
export async function writeDb(newData: { students: IStudent[]; }): Promise<void> {
    await fs.writeFile(dbFilePath, JSON.stringify(newData, null, 2), { encoding: 'utf8' });
}





