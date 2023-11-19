import { ErrorShowDefault } from "./classes/Errors.js";
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
        throw new ErrorShowDefault(
            "No te preocupes, solo estoy probando, welcome",
            "error intencionado",
            "TestError"
        );
    } catch (err) {
        showError(err);
    }

    function executeJSHomePage() {
        clickLogoTiaVicky();
        getDataFromJson();
        productsInteractive();
    }
}
