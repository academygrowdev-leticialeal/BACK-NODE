import Aluno from "./models/aluno.model";
import Disciplina from "./models/disciplina.model";
import { Matricula } from "./models/matricula.model";
import { Turma } from "./models/turma.model";

// Construir disciplinas
const disciplina1 = new Disciplina('Lógica de Programação');
const disciplina2 = new Disciplina('HTML e CSS');
const disciplina3 = new Disciplina('POO');


// Construiria das turmas
const turma1 = new Turma('João da Silva', 5, "2026/1", disciplina1);
const turma2 = new Turma('Maria da Silva', 10, "2026/2", disciplina2);
const turma3 = new Turma('Pedro da Silva', 10, "2026/1", disciplina3);

const maria = new Aluno();
const joao = new Aluno();

turma1.matricular(maria);
turma1.matricular(joao);
console.log(turma1.listarMatriculas());
