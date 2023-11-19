import {
    createCardTemplatePromos,
    createCommentTemplate,
    createListAllFilterTemplate,
    createListSelectedFiltersTemplate,
    createProductTemplate,
} from "../utils/templates.js";

import {
    dataJsonArrayManagement,
    dataJsonObjectManagement,
    getLocalStorageProperty,
    insertElement,
    resetInnerHTML,
} from "../utils/managers.js";

import { shopProducts } from "../utils/global-variables.js";

import { addClickEvent, addInputEvent } from "../utils/event-listeners.js";

export function clickLogoTiaVicky() {
    const logoElement = document.querySelector("h1.logo");
    addClickEvent(logoElement, () => {
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
    });
}

export function getDataFromJson() {
    const dataPath = "src/data/";
    dataJsonObjectManagement(
        "#promos .carrousel",
        dataPath + "offers.json",
        createCardTemplatePromos
    );
    getAllProductsData("#productos>.products", dataPath + "menu.json");
    fillAboutData("#nosotros>p.about-us", dataPath + "about.json");
    dataJsonObjectManagement(
        "#posted-comments",
        dataPath + "comments.json",
        createCommentTemplate
    );

    function getAllProductsData(query, jsonPath) {
        dataJsonObjectManagement(
            query,
            jsonPath,
            createProductTemplate,
            "products"
        );
        shopProducts.setProducts(getLocalStorageProperty("products"));
    }

    function fillAboutData(query, jsonPath) {
        dataJsonArrayManagement(query, jsonPath);
    }
}

export function productsInteractive() {
    searchProducts();
    clickToggleElementActive();
    showSelectedFilters();
    showAllFilters();
    filterProducts();

    function searchProducts() {
        const allProductsElement = document.querySelector(
            "#productos>.products"
        );
        const input = document.querySelector("#search-product>input");
        addInputEvent(input, (e) => {
            let search = e.target.value;
            //? delete the previous data
            resetInnerHTML(allProductsElement);
            shopProducts.resetSearch();
            shopProducts.getProductsByName(search);
            shopProducts.showProducts.forEach((product) => {
                const productElement = createProductTemplate(product);
                insertElement(allProductsElement, productElement);
            });
        });
    }

    function clickToggleElementActive() {
        const element = document.getElementById("filter-products");
        addClickEvent(element, () => {
            let currentClass = element.classList[2];
            let olderClass = currentClass === "active" ? "inactive" : "active"
            element.classList.replace(currentClass, olderClass);
        });
    }

    function showSelectedFilters() {
        const activeFilters = shopProducts.getListFilters();
        const selectedFiltersElement =
            document.getElementById("selected-filters");

        resetInnerHTML(selectedFiltersElement);

        activeFilters.forEach((filterName) => {
            const showFilter = createListSelectedFiltersTemplate(
                activeFilters,
                filterName
            );

            addClickEvent(showFilter, () => {
                const parent = document.querySelector("#productos>.products");
                removeCategoryFromFilter(parent, shopProducts, filterName);
            });

            insertElement(selectedFiltersElement, showFilter);
        });

        function removeCategoryFromFilter(parent, element, text) {
            element.removeFilter("category", text);
            showSelectedFilters();
            fillProductsByCategory(parent);
        }
    }

    function showAllFilters() {
        const listFiltersElement = document.getElementById("list-filters");
        resetInnerHTML(listFiltersElement);
        shopProducts.listAllFilters.forEach((filter) => {
            createListAllFilterTemplate(listFiltersElement, filter);
        });
    }

    function filterProducts() {
        const allFiltersArea = document.getElementById("list-filters");
        const allFiltersElements = [...allFiltersArea.children];
        allFiltersElements.forEach((filterElement) => {
            addClickEvent(filterElement, () => {
                // click x in selected filters // delete filters
                const newFilter = filterElement.querySelector("p").textContent;
                shopProducts.addProductsByFilter("category", [
                    ...shopProducts.getListFilters(),
                    newFilter,
                ]);
                // ? update
                showSelectedFilters();
                fillProductsByCategory(
                    document.querySelector("#productos>.products")
                );
            });
        });
    }

    function fillProductsByCategory(parent) {
        resetInnerHTML(parent);
        shopProducts.showProducts.forEach((product) => {
            const productElement = createProductTemplate(product);
            insertElement(parent, productElement);
        });
    }
}
