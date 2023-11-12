function fillDataWithJson() {
    function fillPromosData(query, jsonPath) {
        const carrouselCards = document.querySelector(query);
        fetch(jsonPath)
            .then((res) => res.json())
            .then((res) => {
                res.forEach(
                    ({
                        name,
                        image,
                        description,
                        offer,
                        time,
                        prices,
                        stock,
                    }) => {
                        const card = document.createElement("div");
                        card.classList.add("card");
                        card.innerHTML = `
                            <h3 class="promo-name text-center"><b>${name}</b></h3>
                            <!-- content card -->
                            <div class="wrapper-image">
                                <img src=${image} alt="Imagen de ${name}">
                            </div>
                            <!-- content card -->
                            <p class="description text-center text-balance">${description}</p>
                            <!-- pricing tag -->
                            <div class="tag">
                                <p class="price old">${prices.normal}</p>
                                <p class="price new">${prices.new}</p>
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
                        carrouselCards.appendChild(card);
                    }
                );
            })
            .catch((err) => console.error(err));
    }
    function fillProductsData(query, jsonPath) {
        const allProducts = document.querySelector(query);
        fetch(jsonPath)
            .then((res) => res.json())
            .then((res) => {
                res.forEach((product) => {
                    let showPrice = product.price;
                    if (showPrice.toString().endsWith(".5"))
                        showPrice = showPrice.toString() + "0";
                    const productElement = document.createElement("section");
                    productElement.classList.add("product", "card");
                    productElement.innerHTML = `
                    <div class="wrapper-image">
                    <img src=${product.image} alt= "Imagen de " ${product.name}>
                    <!-- pricing tag -->
                    <div class="tag">
                        <p class="price">S/. ${showPrice}</p>
                    </div>
                    <!-- pricing tag -->
                </div>
                <h3 class="name">${product.name}</h3>
                <p class="category">${product.category}</p>
                <p class="description">${product.description}</p>
                <div class="interactive-zone">
                    <button><i class="fa-solid fa-cart-plus"></i>Agregar</button>
                    <input type="number" aria-label="input-number-${product.name}" value="0">
                </div>
                    `;
                    allProducts.appendChild(productElement);
                });
            })
            .catch((err) => console.error(err));
    }

    function fillAboutData(query, jsonPath) {
        const [...paragraphs] = document.querySelectorAll(query);

        fetch(jsonPath)
            .then((res) => res.json())
            .then((res) => {
                paragraphs.forEach((p, index) => {
                    p.textContent = res[index];
                });
            })
            .catch((err) => console.error(err));
    }

    function fillDataComments(query, jsonPath) {
        const postedParentElement = document.querySelector(query);

        fetch(jsonPath)
            .then((res) => res.json())
            .then((res) => {
                res.forEach(({ gender, name, time, comment }) => {
                    const cardPublished = document.createElement("article");
                    cardPublished.classList.add("card", "published");
                    cardPublished.innerHTML = `
                        <div class="circle ${gender.toLowerCase()}"></div>
                        <p class="name">${name}</p>
                        <p class="time">${time}</p>
                        <p class="comment"><b>${comment}</b></p>
                    `;
                    postedParentElement.appendChild(cardPublished);
                });
            })
            .catch((err) => console.error(err));
    }

    fillPromosData("#promos .carrousel", "./data/offers.json");
    fillProductsData("#productos>.products", "./data/menu.json");
    fillAboutData("#nosotros>p.about-us", "./data/about.json");
    fillDataComments("#posted-comments", "./data/comments.json");
}

function allInputsMultiLine(query) {
    const [...inputs] = document.querySelectorAll(query);
    inputs.forEach((input) => {
        doMultilineInputs(input);
    });
}

function doMultilineInputs(element) {
    element.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            this.value += "\n";
        }
    });
}

fillDataWithJson();
allInputsMultiLine("#opiniones input");
