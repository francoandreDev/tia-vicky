import {
    clickLogoTiaVicky,
    getDataFromJson,
    productsInteractive,
} from "./functions/pages/home.page.js";
import { showError } from "./functions/utils/managers.js";

main();

function main() {
    try {
        executeJSHomePage();
    } catch (err) {
        showError(err);
    }

    function executeJSHomePage() {
        clickLogoTiaVicky();
        getDataFromJson();
        productsInteractive();
    }
}
