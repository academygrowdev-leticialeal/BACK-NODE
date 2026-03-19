import Aluno from "./aluno.model";
import Disciplina from "./disciplina.model";
import { Matricula, SituacaoMatricula } from "./matricula.model";
import { v4 as generateUid } from 'uuid';

export enum StatusTurma {
    ABERTA = 'ABERTA',
    ENCERRADA = 'ENCERRADA'
}

export class Turma {
    private _id: string = generateUid();
    private _matriculas: Array<Matricula> = [];
    private _status: StatusTurma = StatusTurma.ABERTA;


    constructor(
        private _professor: string,
        private _vagasMaximas: number,
        private _periodo: string,
        private _disciplina: Disciplina // associação
    ) {
        if (this._vagasMaximas <= 0) {
            throw new Error('A turma deve possuir ao menos 1 aluno. Número máximo de vgaas deve ser maior que zero.');
        }
    }

    public get id(): string {
        return this._id;
    }

    public get professor(): string {
        return this._professor;
    }

    public get vagasMaximas(): number {
        return this._vagasMaximas
    }

    public get periodo(): string {
        return this._periodo
    }

    public get status(): StatusTurma {
        return this._status
    }

    public get disciplina(): Disciplina {
        return this._disciplina
    }


    public listarMatriculas(): ReadonlyArray<Matricula> {
        return [...this._matriculas];
    }

    public matricular(novoAluno: Aluno) {
        // Deve estar ABERTA
        if (this._status !== StatusTurma.ABERTA) {
            throw new Error('Só é possivel matricular alunos em uma turma ABERTA')
        }

        // Deve possuir vagas
        if (!this.possuiVaga()) {
            throw new Error('A turma atingiu o limite máximo de vagas')
        }

        // O aluno não pode estar já matriculado
        const jaMatriculado = this._matriculas.some((matricula) => matricula.aluno.id === novoAluno.id)

        if (jaMatriculado) {
            throw new Error('Aluno já matriculado nessa turma');
        }

        const novaMatricula = new Matricula(novoAluno, this);
        this._matriculas.push(novaMatricula);
    }

    public encerrar() {
        // Só deve ser possivel ENCERRAR turmas abertas
        if (this.status !== StatusTurma.ABERTA) {
            throw new Error('Só é possível encerrar turmas que estão com status ABERTA')
        }

        this._matriculas.forEach((matricula) => matricula.finalizar());

        this._status = StatusTurma.ENCERRADA;
    }

    private possuiVaga(): boolean {
        const qtdMatriculasAtivas = this._matriculas.filter((matricula) => matricula.situacao === SituacaoMatricula.CURSANDO).length;

        return qtdMatriculasAtivas < this._vagasMaximas;
    }
}