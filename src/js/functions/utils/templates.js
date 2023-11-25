import { changeAmountLogic, deleteProductLogic } from "../pages/cart.page.js";
import { addClickProducts, changeInputValue } from "../pages/home.page.js";
import { addClickEvent } from "./event-listeners.js";
import { cartProducts, soundsPath } from "./global-variables.js";
import { appendElement } from "./managers.js";

export function fetchTemplate(path, fn) {
    fetch(path)
        .then((res) => res.json())
        .then((res) => fn(res))
        .catch((e) => console.error(e));
}

export function createCardTemplatePromos(props) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    const { name, category, image, description, prices, offer, time, stock } =
        props;
    cardElement.innerHTML = `
        <h3 class="promo-name text-center text-balance"><b>${name}</b></h3>
        <!-- content card -->
        <div class="wrapper-image">
            <img src=${image} alt="Imagen de ${name} loading="lazy">
        </div>
        <!-- content card -->
        <p class="description text-center text-pretty">${description}</p>
        <!-- pricing tag -->
        <div class="tag bg-default">
            <p class="price old">${prices.normal}</p>
            <p class="price new">S/. ${prices.new}</p>
        </div>
        <!-- pricing tag -->
        <!-- offer -->
        <div class="offer">
            <p>${offer}</p>
        </div>
        <p class="time">${time}</p>
        <span class="stock">${stock}</span>
        <!-- offer -->
    `;
    const storeObject = {
        element: cardElement,
        values: {
            name,
            category,
            image,
            description,
            price: prices.new,
            stock,
        },
    };
    addClickProducts(storeObject);
    return cardElement;
}

export function createProductTemplate(props) {
    const productElement = document.createElement("section");
    productElement.classList.add("product", "card");
    const { name, image, price, category, description } = props;
    let showPrice = price.toString().endsWith(".5") ? price + "0" : price;
    productElement.innerHTML = `
        <div class="wrapper-image">
        <img src=${image} loading="lazy" alt= "Imagen de " ${name}>
        <!-- pricing tag -->
        <div class="tag bg-default">
            <p class="price">S/. ${showPrice}</p>
        </div>
        <!-- pricing tag -->
        </div>
        <h3 class="name">${name}</h3>
        <p class="category">${category}</p>
        <p class="description">${description}</p>
        <div class="interactive-zone">
            <button><i class="fa-solid fa-cart-plus"></i>Agregar</button>
            <input type="number" aria-label="input-number-${name}" value="0">
        </div>
    `;
    const element = productElement.querySelector(".interactive-zone");
    const storeObject = { element: element, values: props };
    changeInputValue(storeObject);
    return productElement;
}

export function createCommentTemplate(props) {
    const cardPublished = document.createElement("article");
    const parentClasses = ["card", "published", "rounded-borders", "bg-accent"];
    cardPublished.classList.add(...parentClasses);
    const { gender, name, time, comment } = props;
    const imagePath = `/src/assets/images/${
        gender === "Male" ? "Male.png" : "Female.png"
    }`;
    cardPublished.innerHTML = `
        <div class="circle bg-default ${gender.toLowerCase()}">
            <img src="${imagePath}" alt="${gender} image" loading="lazy" style="width: 100%; height: 100%;">
        </div>
        <p class="name">${name}</p>
        <p class="time">${time}</p>
        <p class="comment"><b>${comment}</b></p>
    `;
    return cardPublished;
}

export function createListSelectedFiltersTemplate(activeFilters, text) {
    const listElement = document.createElement("li");
    listElement.classList.add("filter", "bg-default");
    listElement.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    if (activeFilters.length === 0) {
        listElement.id = "default-filter";
    } else {
        listElement.innerHTML += `<p>${text}</p>`;
    }
    return listElement;
}

export function createListAllFilterTemplate(parent, text) {
    const showFilter = document.createElement("li");
    showFilter.classList.add("filter", "bg-default");
    showFilter.innerHTML = `
        <p>${text}</p>
    `;
    appendElement(parent, showFilter);
}

let cartModuleStored = document.createElement("div");

export function createCartPageTemplate(parent) {
    const cartModule = document.createElement("div");
    cartModule.id = "cart-module";
    cartModule.classList.add("template");
    cartModule.innerHTML = `
        <div class="window">
            <section class="window_section">
                <h2>Lista de Productos</h2>
                <section class="products-region"></section>
            </section>
            <section class="window_section">
                <h2>Resumen de la Compra</h2>
                <section class="products-region"></section>
                <section class="interactive-zone">
                    <button>Total a Pagar: S/. ${cartProducts.calcTotalPrice()}</button>
                    <button>Pagar</button>
                </section>
            </section>
        </div>
        `;
    const { body } = document;
    const [...appContent] = document.querySelectorAll(".app > main > *");
    addClassInElements(appContent, "disappear");
    body.insertBefore(cartModule, parent);
    const pageHeight = body.offsetHeight + "px";
    cartModule.style.height = pageHeight;
    addClickEvent(
        cartModule.querySelector(".window"),
        () => {
            closeTemplate();
        },
        soundsPath + "click-classic.wav",
        false
    );
    cartModuleStored = cartModule;
}

export function updateTotalPrice() {
    const buttonElement = cartModuleStored.querySelector(
        ".window_section:last-of-type .interactive-zone button"
    );
    buttonElement.textContent =
        "Total a Pagar: S/. " + cartProducts.calcTotalPrice();
}

export function closeTemplate() {
    const template = document.getElementsByClassName("template")[0];
    template.classList.add("remove");
    setTimeout(() => {
        document.body.removeChild(template);
        const [...appContent] = document.querySelectorAll(".app > main > *");
        removeClassInElements(appContent, "disappear", "appear");
    }, 1000);
}

export function addClassInElements(elements, className) {
    elements.forEach((element) => {
        element.classList.add(className);
    });
}

export function removeClassInElements(elements, oldClassName, newClassName) {
    elements.forEach((element) => {
        element.classList.replace(oldClassName, newClassName);
    });
    setTimeout(() => {
        elements.forEach((element) => {
            element.classList.remove(newClassName);
        });
    }, 1000);
}

export function createProductTemplateCart(product) {
    const productElement = document.createElement("section");
    productElement.classList.add("product", "card", "cart");
    const { amount, name, image, price, category, description } = product;
    let showPrice = price.toString().endsWith(".5") ? price + "0" : price;
    productElement.innerHTML = `
        <div class="wrapper-image">
            <img src=${image} loading="lazy" alt= "Imagen de " ${name}>
            <!-- pricing tag -->
            <div class="tag bg-default">
            <p class="price">S/. ${showPrice}</p>
            </div>
            <!-- pricing tag -->
        </div>
        <h3 class="name">${name}</h3>
        <p class="category">${category}</p>
        <p class="description">${description}</p>
        <div class="interactive-zone">
            <button><i class="fa-solid fa-cart-plus"></i>Eliminar</button>
            <input type="number" aria-label="input-number-${name}" value="${amount}">
        </div>
    `;
    const buttonElement = productElement.querySelector(
        ".interactive-zone button"
    );
    const inputElement = productElement.querySelector(
        ".interactive-zone input"
    );
    changeAmountLogic(inputElement, product);
    deleteProductLogic(buttonElement, product.id);
    return productElement;
}

export function createSummaryProductTemplateCart(product) {
    const productElement = document.createElement("section");
    productElement.classList.add("product", "card");
    const { name, image, price } = product;
    let showPrice = price.toString().endsWith(".5") ? price + "0" : price;
    productElement.innerHTML = `
        <div class="wrapper-image">
            <img src=${image} loading="lazy" alt= "Imagen de " ${name}>
        </div>
        <!-- pricing tag -->
        <div class="tag bg-default">
            <p class="price">S/. ${showPrice}</p>
        </div>
        <!-- pricing tag -->
        <h3 class="name">${name}</h3>
    `;
    return productElement;
}
