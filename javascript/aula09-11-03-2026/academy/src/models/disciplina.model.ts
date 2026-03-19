import { v4 as generateUid } from 'uuid';

export default class Disciplina {
    private _id: string = generateUid();


    constructor(
        private _titulo: string
    ) { }

    public get id(): string {
        return this._id
    }

    public get titulo(): string {
        return this._titulo
    }
}