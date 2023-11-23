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
    appendElement,
    resetInnerHTML,
    toggleClassElement,
    getLocalStorageProperty,
} from "../utils/managers.js";

import { dataPath, shopProducts } from "../utils/global-variables.js";

import { addClickEvent, addInputEvent } from "../utils/event-listeners.js";

export function clickLogoTiaVicky() {
    const logoElement = document.querySelector("h1.logo");
    const scrollConfig = { top: 0, left: 0, behavior: "smooth" };
    addClickEvent(logoElement, () => {
        window.scroll(scrollConfig);
    });
}

export function getDataFromJson() {
    getAllPromosData("#promos .show-promos", dataPath + "offers.json");
    getAllProductsData("#productos>.products", dataPath + "menu.json");
    getAllAboutData("#nosotros>p.about-us", dataPath + "about.json");
    getAllCommentsPublished("#posted-comments", dataPath + "comments.json");

    function getAllPromosData(query, jsonPath) {
        dataJsonObjectManagement(query, jsonPath, createCardTemplatePromos);
    }

    function getAllProductsData(query, jsonPath) {
        dataJsonObjectManagement(
            query,
            jsonPath,
            createProductTemplate,
            "products"
        );
        shopProducts.setProducts(getLocalStorageProperty("products"));
    }

    function getAllAboutData(query, jsonPath) {
        dataJsonArrayManagement(query, jsonPath);
    }

    function getAllCommentsPublished(query, jsonPath) {
        dataJsonObjectManagement(query, jsonPath, createCommentTemplate);
    }
}

export function productsInteractive() {
    searchProducts();
    clickToggleShowFilters();
    showSelectedFilters();
    showAllFilters();
    filterProducts();

    function searchProducts() {
        const allProductsElement = document.querySelector(
            "#productos>.products"
        );
        const input = document.querySelector("#search-product>input");
        addInputEvent(input, (e) => {
            //? delete the previous data
            resetInnerHTML(allProductsElement);
            shopProducts.getProductsByName(e.target.value);
            shopProducts.showProducts.forEach((product) => {
                const productElement = createProductTemplate(product);
                appendElement(allProductsElement, productElement);
            });
        });
    }

    function clickToggleShowFilters() {
        const element = document.getElementById("filter-products");
        addClickEvent(element, () =>
            toggleClassElement(element, 2, "active", "inactive")
        );
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

            appendElement(selectedFiltersElement, showFilter);
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
        const parent = document.querySelector("#productos>.products");
        const allFiltersElements = [
            ...document.querySelectorAll("#list-filters>*"),
        ];
        allFiltersElements.forEach((filterElement) => {
            addClickEvent(filterElement, () => {
                const newFilter = filterElement.querySelector("p").textContent;
                shopProducts.addNewFilter("category", newFilter);
                // ? update
                showSelectedFilters();
                fillProductsByCategory(parent);
            });
        });
    }

    function fillProductsByCategory(parent) {
        resetInnerHTML(parent);
        shopProducts.showProducts.forEach((product) => {
            const productElement = createProductTemplate(product);
            appendElement(parent, productElement);
        });
    }
}

export function addClickOnMapImage() {
    const img = document.getElementById("iframe-maps");
    if (img) {
        addClickEvent(img, () => {
            window.open("https://maps.app.goo.gl/W8hRJXZxTZBPSaj99");
        });
    }
}
