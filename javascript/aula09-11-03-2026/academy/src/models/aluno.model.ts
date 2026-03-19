import { v4 as generateUid } from 'uuid';

export default class Aluno {
    private _id: string = generateUid();

    constructor(

    ) { }


    public get id(): string {
        return this._id
    }

}