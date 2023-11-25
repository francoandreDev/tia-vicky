export class Cart {
    #cart = [];

    constructor() {
        this.totalPrice = 0;
    }

    addProduct(product, amount = 1) {
        product.amount = this.#stringToNumber(amount);
        this.#cart.push(product);
        this.#deleteRepeatOrders();
    }

    removeProduct(id) {
        this.#cart = this.#cart.filter((order) => order.id !== id);
    }

    listProducts() {
        return this.#cart;
    }

    #deleteRepeatOrders() {
        this.#cart = [...new Set(this.#cart)];
    }

    #stringToNumber(string) {
        return parseInt(string);
    }

    calcTotalPrice() {
        this.#deleteRepeatOrders();
        this.totalPrice = this.#cart.reduce(
            (acc, order) => (acc += order.price * order.amount),
            0
        );
        this.totalPrice = Number(this.totalPrice.toFixed(2));
        if(this.totalPrice === NaN) return "Cantidad no válida"
        return this.totalPrice;
    }
}
