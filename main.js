function fillDataWithJson() {
    function fillProductsData(query, jsonPath) {
        const allProducts = document.querySelector(query);
        fetch(jsonPath)
            .then((res) => res.json())
            .then((res) => {
                res.forEach((product) => {
                    const productElement = document.createElement("section");
                    productElement.classList.add("product", "card");
                    productElement.innerHTML = `
                    <div class="wrapper-image">
                    <img src=${product.image} alt= "Imagen de " ${product.name}>
                    <!-- pricing tag -->
                    <div class="tag">
                        <p class="price">S/. ${product.price}</p>
                    </div>
                    <!-- pricing tag -->
                </div>
                <h3 class="name">${product.name}</h3>
                <p class="category">${product.category}</p>
                <p class="description">${product.description}</p>
                <div class="interactive-zone">
                    <button><i class="fa-solid fa-cart-plus"></i>Agregar</button>
                    <input type="number" aria-label="input-number-" value="0">
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

    fillProductsData("#productos>.products", "./data/menu.json");
    fillAboutData("#nosotros>p.about-us", "./data/about.json");
    fillDataComments("#posted-comments", "./data/comments.json");
}

fillDataWithJson();
