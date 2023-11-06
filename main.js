function fillDataWithJson() {
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

    fillAboutData("#nosotros>p.about-us", "./data/about.json");
    fillDataComments("#opiniones .card.published", "p", "./data/comments.json");
}

fillDataWithJson();
