export class Operations {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
    addition() {
        return this.a + this.b;
    }
    subtraction() {
        return this.a - this.b;
    }
    multiplication() {
        return this.a * this.b;
    }
    division() {
        if (this.b === 0) throw new Error("You cannot divide a number by zero");
        return this.a / this.b;
    }
}
