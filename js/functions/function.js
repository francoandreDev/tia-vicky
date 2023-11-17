export function createCardTemplatePromos(props) {
    const card = document.createElement("div");
    card.classList.add("card");
    const { name, image, description, prices, offer, time, stock } = props;
    card.innerHTML = `
        <h3 class="promo-name text-center"><b>${name}</b></h3>
        <!-- content card -->
        <div class="wrapper-image">
            <img src=${image} alt="Imagen de ${name}">
        </div>
        <!-- content card -->
        <p class="description text-center text-balance">${description}</p>
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
    return card;
}

export function createProductTemplate(props) {
    const productElement = document.createElement("section");
    productElement.classList.add("product", "card");
    const { name, image, price, category, description } = props;
    let showPrice = price.toString().endsWith(".5") ? price + "0" : price;
    productElement.innerHTML = `
        <div class="wrapper-image">
        <img src=${image} alt= "Imagen de " ${name}>
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
    return productElement;
}

export function createCommentTemplate(props) {
    const cardPublished = document.createElement("article");
    const parentClasses = ["card", "published", "rounded-borders", "bg-accent"];
    cardPublished.classList.add(...parentClasses);
    const { gender, name, time, comment } = props;
    cardPublished.innerHTML = `
        <div class="circle bg-default ${gender.toLowerCase()}"></div>
        <p class="name">${name}</p>
        <p class="time">${time}</p>
        <p class="comment"><b>${comment}</b></p>
    `;
    return cardPublished;
}

export function dataJsonObjectManagement(
    query,
    jsonPath,
    createTemplate,
    name = ""
) {
    const element = document.querySelector(query);
    fetch(jsonPath)
        .then((res) => res.json())
        .then((res) => {
            res.forEach((props) => {
                if (name !== "")
                    localStorage.setItem(name, JSON.stringify(res));
                const template = createTemplate(props);
                element.appendChild(template);
            });
        })
        .catch((err) => console.error(err));
}

export function dataJsonArrayManagement(query, jsonPath) {
    const [...elements] = document.querySelectorAll(query);

    fetch(jsonPath)
        .then((res) => res.json())
        .then((res) => {
            elements.forEach((element, index) => {
                element.textContent = res[index];
            });
        })
        .catch((err) => console.error(err));
}
