export class Cart {
    constructor() {
        this.cart = [];
    }

    addProduct(product, amount) {
        product.amount = amount;
        this.cart.push(product);
    }

    removeProduct(id) {
        this.cart.filter((product) => product.id !== id);
    }

    listProducts() {
        console.log(this.cart);
    }
}
