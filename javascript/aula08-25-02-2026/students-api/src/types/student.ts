
// type
// type Student = {
//     id: number;
//     name: string;
//     email: string;
//     birthDate: string;
// }

// interface -> contratos
export default interface IStudent {
    id: number;
    name: string;
    email: string;
    birthDate: string;
}

// interface IStudentPlus extends IStudent {
//     isEnabledPlus: boolean;
// }

// Uniões e Interseções -> type
// Generics e utilities types -> types
// type StudentPlus = Student & { isEnabledPlus: boolean; }
