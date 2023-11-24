import { addClickEvent } from "../utils/event-listeners.js";
import { closeTemplate, createCartPageTemplate } from "../utils/templates.js";

export function addClickCart() {
    const cart = document.querySelector(
        "#nav .interactive-zone #cart-shopping-icon"
    );
    const app = document.getElementsByClassName("app")[0];

    addClickEvent(cart, () => {
        const cartModule = document.getElementById("cart-module");
        if (!cartModule) createCartPageTemplate(app);
        else closeTemplate();
    });
}
