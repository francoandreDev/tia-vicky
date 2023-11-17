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

export const {localStorage} = window