class Someclass {
    constructor() {
        this.kek = 5;
        this.mda = 6;
    }

    show() {
        console.log(this.kek + this.mda)
    }
}

export default new Someclass()