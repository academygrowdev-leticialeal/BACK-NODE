export default class Assessment {
    id: number; // implicidamente é public


    constructor(
        public title: string,
        public score: number,
        public description?: string,
    ) {
        this.id = new Date().getTime();
    }

}



