import { Products } from "../../classes/Products.js";
import {
    createCardTemplatePromos,
    createCommentTemplate,
    createProductTemplate,
} from "../utils/templates.js";

import {
    dataJsonArrayManagement,
    dataJsonObjectManagement,
    localStorage,
} from "../utils/managers.js";

const theProducts = new Products();

export function clickLogoTiaVicky() {
    document.querySelector("h1.logo").addEventListener("click", () => {
        goToTop();
    });
    function goToTop() {
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
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
        theProducts.setProducts(JSON.parse(localStorage.getItem("products")));
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
        input.addEventListener("input", (e) => {
            let search = e.target.value;
            //? delete the previous data
            allProductsElement.innerHTML = "";
            theProducts.resetSearch();
            theProducts.getProductsByName(search);
            theProducts.showProducts.forEach((product) => {
                const productElement = createProductTemplate(product);
                allProductsElement.appendChild(productElement);
            });
        });
    }

    function clickToggleElementActive() {
        const element = document.getElementById("filter-products");
        element.addEventListener("click", () => {
            let currentClass = element.classList[2];
            if (currentClass === "active") {
                element.classList.replace("active", "inactive");
            } else {
                element.classList.replace("inactive", "active");
            }
        });
    }

    function showSelectedFilters() {
        const activeFilters = theProducts.getListFilters();
        const selectedFiltersElement =
            document.getElementById("selected-filters");
        // ? reset content
        selectedFiltersElement.innerHTML = "";
        activeFilters.forEach((filterName) => {
            const showDefault = document.createElement("li");
            showDefault.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
            showDefault.classList.add("filter", "bg-default");
            if (activeFilters.length === 0) {
                showDefault.id = "default-filter";
            } else {
                showDefault.innerHTML += `<p>${filterName}</p>`;
            }
            showDefault.addEventListener("click", () => {
                theProducts.removeFilter("category", filterName);
                showSelectedFilters();
                const parent = document.querySelector("#productos>.products");
                fillProductsByCategory(parent);
            });
            selectedFiltersElement.appendChild(showDefault);
        });
    }

    function showAllFilters() {
        const listFiltersElement = document.getElementById("list-filters");
        // ? reset content
        listFiltersElement.innerHTML = "";

        theProducts.listAllFilters.forEach((filter) => {
            const showFilter = document.createElement("li");
            showFilter.classList.add("filter", "bg-default");
            showFilter.innerHTML = `
                <p>${filter}</p>
                `;
            listFiltersElement.appendChild(showFilter);
        });
    }

    function filterProducts() {
        const allFiltersArea = document.getElementById("list-filters");
        const allFiltersElements = [...allFiltersArea.children];
        allFiltersElements.forEach((filterElement) => {
            filterElement.addEventListener("click", () => {
                // click x in selected filters // delete filters
                const newFilter = filterElement.querySelector("p").textContent;
                theProducts.addProductsByFilter("category", [
                    ...theProducts.getListFilters(),
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
        parent.innerHTML = "";
        theProducts.showProducts.forEach((product) => {
            const productElement = createProductTemplate(product);
            parent.appendChild(productElement);
        });
    }
}
