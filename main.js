import { Products } from "./js/classes/class.js";
import {
    createCardTemplatePromos,
    createCommentTemplate,
    createProductTemplate,
    dataJsonArrayManagement,
    dataJsonObjectManagement,
} from "./js/functions/function.js";

const localStorage = window.localStorage;

const productsLogic = new Products();

clickLogoTiaVicky();
getDataFromJson();
productsInteractive();

function clickLogoTiaVicky() {
    document.querySelector("h1.logo").addEventListener("click", () => {
        goToTop();
    });
    function goToTop() {
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }
}

function getDataFromJson() {
    dataJsonObjectManagement(
        "#promos .carrousel",
        "./data/offers.json",
        createCardTemplatePromos
    );
    getAllProductsData("#productos>.products", "./data/menu.json");
    fillAboutData("#nosotros>p.about-us", "./data/about.json");
    dataJsonObjectManagement(
        "#posted-comments",
        "./data/comments.json",
        createCommentTemplate
    );

    function getAllProductsData(query, jsonPath) {
        dataJsonObjectManagement(
            query,
            jsonPath,
            createProductTemplate,
            "products"
        );
        productsLogic.setProducts(JSON.parse(localStorage.getItem("products")));
    }

    function fillAboutData(query, jsonPath) {
        dataJsonArrayManagement(query, jsonPath);
    }
}

function productsInteractive() {
    const filterElement = document.getElementById("filter-products");

    searchProducts();
    clickToggleElementActive(filterElement);
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
            productsLogic.resetSearch();
            productsLogic.getProductsByName(search);
            productsLogic.showProducts.forEach((product) => {
                const productElement = createProductTemplate(product);
                allProductsElement.appendChild(productElement);
            });
        });
    }

    function clickToggleElementActive(element) {
        element.addEventListener("click", () => {
            let currentClass = filterElement.classList[1];
            if (currentClass === "active") {
                filterElement.classList.replace("active", "inactive");
            } else {
                filterElement.classList.replace("inactive", "active");
            }
        });
    }

    function showSelectedFilters() {
        const activeFilters = productsLogic.getListFilters();
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
                productsLogic.removeFilter("category", filterName);
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

        productsLogic.listAllFilters.forEach((filter) => {
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
                productsLogic.addProductsByFilter("category", [
                    ...productsLogic.getListFilters(),
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
        productsLogic.showProducts.forEach((product) => {
            const productElement = createProductTemplate(product);
            parent.appendChild(productElement);
        });
    }
}
