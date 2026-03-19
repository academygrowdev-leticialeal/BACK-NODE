import Assessment from "./assessment.model";


// PascalCase
export class Student {

    // Toda classe pode possuir propriedades e métodos

    // 1 - definição das propriedades
    private _id: number;
    private _assessments: Assessment[] = [];

    // construtor
    // definição dos parametros do contrutor
    constructor(
        public name: string,
        private _email: string,
        public birthDate: string
    ) {
        // atribuição dos parametros às propriedades da classe
        this._id = new Date().getTime();
    }

    // acessor para os valores dos atributos da classe
    public get id(): number {
        return this._id;
    }

    public get assessments(): Assessment[] {
        return this._assessments;
    }


    // modificadores para os valores dos atributos da classe
    // public set assessments(data: { title: string, score: number, description?: string }) {
    //     if (data.score >= 0 && data.score <= 10) {
    //         const assessment = new Assessment(data.title, data.score, data.description);
    //         this.assessments.push(assessment);
    //     }
    // }

    public set email(novoEmail: string) {
        if (novoEmail.includes("@")) {
            this._email = novoEmail
        }
    }



    // 2 - definição dos métodos
    // Ex: no nosso projeto só faz sentido ter a avaliação registrada enquanto o aluno existir. Logo, os dados da avaliação devem ser recebidos por parametro do método e o objeto avaliação deve ser criado dentro do método, para que a avaliação seja registrada somente se o aluno existir.
    registrarAvaliacao(title: string, score: number, description?: string) {

        if (score >= 0 && score <= 10) {
            const assessment = new Assessment(title, score, description);
            this.assessments.push(assessment);
        }

    }

    calcularMedia() {
        const media = this.assessments.reduce((acc, assessment) => acc + assessment.score, 0) / this.assessments.length;

        console.log(`Média do aluno ${this.name}: ${media.toFixed(2)}`);
    }
}


// Classe é um molde para criar objetos -> instância de uma classe

// Objeto LITERAL
// const joao: IStudent = {
//     id: 1,
//     name: "João",
//     email: "joao@email.com",
//     birthDate: "2000-01-01"
// }

// Objeto INSTÂNCIA
const maria = new Student("Maria", "mari@gmail.com", "2000-01-01");
console.log(maria.id)
console.log(maria.assessments);

// NADA SEMANTICO, NÃO FICA CLARO O QUE ESTÁ ACONTECENDO ❌
// maria.assessments = {
//     title: "Titulo 1",
//     score: 10,
//     description: "Uma descricao bacana"
// }

// ASSIM ME PARECE MELHOR DE ENTENDER ✅
maria.registrarAvaliacao("Titulo 1", 10, "Uma descricao bacana")

// ASSIM É FÁCIL DE ENTENDER NESTE CASO ✅
maria.email = 'maria2@gmail.com'








