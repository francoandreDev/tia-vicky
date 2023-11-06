function fillDataWithJson() {
    function fillProductsData(query, jsonPath) {
        const allProducts = document.querySelector(query);
        const [...productCards] = allProducts.children;
        fetch(jsonPath)
            .then((res) => res.json())
            .then((res) => {
                productCards.forEach((productCard, index) => {
                    const price = productCard.querySelector(".price");
                    const name = productCard.querySelector(".name");
                    const category = productCard.querySelector(".category");
                    const image =
                        productCard.querySelector(".wrapper-image>img");
                    const description =
                        productCard.querySelector(".description");
                    price.textContent = "S/. " + res[index].price;
                    name.textContent = res[index].name;
                    category.textContent = res[index].category;
                    description.textContent = res[index].description;
                    image.alt = "Imagen de " + res[index].name;
                    image.src = res[index].image;
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

    function fillDataComments(query, subQuery, jsonPath) {
        const [...cards] = document.querySelectorAll(query);

        fetch(jsonPath)
            .then((res) => res.json())
            .then((res) => {
                cards.forEach((card, index) => {
                    const [...paragraphs] = card.querySelectorAll(subQuery);
                    paragraphs[0].textContent = res[index].name;
                    paragraphs[1].textContent = res[index].time;
                    paragraphs[2].textContent = res[index].comment;
                });
            })
            .catch((err) => console.error(err));
    }

    fillProductsData("#productos>.products", "./data/menu.json");
    fillAboutData("#nosotros>p.about-us", "./data/about.json");
    fillDataComments("#opiniones .card.published", "p", "./data/comments.json");
}

fillDataWithJson();
