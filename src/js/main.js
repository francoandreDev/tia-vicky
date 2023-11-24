import { addClickCart } from "./functions/pages/cart.page.js";
import {
    addClickOnMapImage,
    clickLogoTiaVicky,
    commentsInteractive,
    getDataFromJson,
    productsInteractive,
} from "./functions/pages/home.page.js";
import { showError } from "./functions/utils/managers.js";

main();

function main() {
    try {
        executeJSHomePage();
        executeJSCartPage();
    } catch (err) {
        showError(err);
    }

    function executeJSHomePage() {
        clickLogoTiaVicky();
        getDataFromJson();
        productsInteractive();
        commentsInteractive();
        addClickOnMapImage();
    }

    function executeJSCartPage() {
        addClickCart();
    }
}
