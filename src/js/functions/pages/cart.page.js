import { addClickEvent, addInputEvent } from "../utils/event-listeners.js";
import { cartProducts } from "../utils/global-variables.js";
import { appendElement, resetInnerHTML, scrollTo } from "../utils/managers.js";
import {
    closeTemplate,
    createCartPageTemplate,
    createProductTemplateCart,
    createSummaryProductTemplateCart,
    updateTotalPrice,
} from "../utils/templates.js";

export function addClickCart() {
    const cart = document.querySelector(
        "#nav .interactive-zone #cart-shopping-icon"
    );
    const app = document.getElementsByClassName("app")[0];

    addClickEvent(cart, () => {
        const cartModule = document.getElementById("cart-module");
        if (!cartModule) {
            createCartPageTemplate(app);
            setTimeout(() => {
                scrollTo();
            }, 2500);
        } else closeTemplate();
        fillDataProductsList();
        fillDataSummaryShop();
    });
}

function fillDataProductsList() {
    const ProductSectionElement = document.querySelector(
        "#cart-module .window_section:first-of-type .products-region"
    );
    resetInnerHTML(ProductSectionElement);
    const listProducts = cartProducts.listProducts();
    listProducts.forEach((product) => {
        const productElement = createProductTemplateCart(product);
        appendElement(ProductSectionElement, productElement);
    });
}

function fillDataSummaryShop() {
    const ProductSectionElement = document.querySelector(
        "#cart-module .window_section:last-of-type .products-region"
    );
    resetInnerHTML(ProductSectionElement);
    const listProducts = cartProducts.listProducts();
    listProducts.forEach((product) => {
        const productElement = createSummaryProductTemplateCart(product);
        appendElement(ProductSectionElement, productElement);
    });
}

export function deleteProductLogic(buttonElement, id) {
    addClickEvent(buttonElement, () => {
        cartProducts.removeProduct(id);
        updateCart();
        updateTotalPrice();
    });
}

export function changeAmountLogic(inputElement, product) {
    addInputEvent(inputElement, () => {
        // ? update amount product
        cartProducts.addProduct(product, inputElement.value);
        updateTotalPrice();
    });
}

function updateCart() {
    fillDataProductsList();
    fillDataSummaryShop();
}
