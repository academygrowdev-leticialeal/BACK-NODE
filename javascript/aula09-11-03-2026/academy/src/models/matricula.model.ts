import Aluno from "./aluno.model";
import { StatusTurma, Turma } from "./turma.model";
import { v4 as generateUid } from 'uuid';

export enum SituacaoMatricula {
    CURSANDO = 'CURSANDO',
    APROVADO = 'APROVADO',
    REPROVADO = 'REPROVADO',
    TRANCADO = 'TRANCADO'
}

export class Matricula {
    private _id: string = generateUid();
    private _nota1?: number;
    private _nota2?: number;
    private _frequencia?: number;
    private _situacao: SituacaoMatricula = SituacaoMatricula.CURSANDO


    constructor(
        private _aluno: Aluno,
        private _turma: Turma,
    ) { }

    public get id(): string {
        return this._id
    }


    public get aluno(): Aluno {
        return this._aluno
    }


    public get turma(): Turma {
        return this._turma
    }

    public get nota1(): number | undefined {
        return this._nota1;
    }

    public get nota2(): number | undefined {
        return this._nota2;
    }

    public get frequencia(): number | undefined {
        return this._frequencia;
    }

    public get situacao(): SituacaoMatricula {
        return this._situacao;
    }


    public registrarNota1(nota: number) {
        this.validarMatriculaEditavel();
        this.validarNota(nota);
        this._nota1 = nota;
    }

    public registrarNota2(nota: number) {
        this.validarMatriculaEditavel();
        this.validarNota(nota);
        this._nota2 = nota;
    }

    public registrarFrequencia(frequencia: number) {
        this.validarMatriculaEditavel();
        this.validarFrequencia(frequencia);
        this._frequencia = frequencia;
    }


    public trancar() {
        if (this._turma.status !== StatusTurma.ABERTA) {
            throw new Error("Só é possível trancar uma matricula de uma turma cujo status é ABERTA");
        }

        this.validarMatriculaEditavel();

        this._situacao = SituacaoMatricula.TRANCADO;
    }


    public finalizar() {
        this.validarMatriculaEditavel();

        const media = this.calcularMedia();

        if (media === -1 || !this._frequencia) {
            throw new Error('Não é possível finalizar uma matricula sem notas e sem frequência registrada');
        }

        const notaOK = media >= 7;
        const frequenciaOK = this._frequencia >= 75;

        this._situacao = notaOK && frequenciaOK ?
            SituacaoMatricula.APROVADO
            : SituacaoMatricula.REPROVADO
    }


    public calcularMedia(): number {
        if (!this._nota1 && !this._nota2) return -1;

        return ((this._nota1 || 0) + (this._nota2 || 0)) / 2;
    }



    // #### METODOS PRIVADOS
    private validarMatriculaEditavel() {
        if (this._situacao !== SituacaoMatricula.CURSANDO) {
            throw new Error(`Situação da matricula: ${this._situacao}. Só é possível editar matriculas cuja situação é CURSANDO`)
        }
    }

    private validarNota(nota: number) {
        if (nota < 0 || nota > 10) {
            throw new Error('A nota deve ser um valor numérico de 0 à 10')
        }
    }

    private validarFrequencia(frequencia: number) {
        if (frequencia < 0 || frequencia > 100) {
            throw new Error('A frequencia deve ser um valor numérico de 0 à 100')
        }
    }
}