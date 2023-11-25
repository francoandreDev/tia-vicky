import { Cart } from "../../classes/Cart.js";
import { Products } from "../../classes/Products.js";

export const { localStorage } = window;

export const soundsPath = "src/assets/sounds/";
export const dataPath = "src/data/";

export const shopProducts = new Products();
export const cartProducts = new Cart()
