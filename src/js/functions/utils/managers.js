import { localStorage } from "./global-variables.js";

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
                if (name !== "") setLocalStorageProperty(name, res);
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

export function setLocalStorageProperty(propertyName, value) {
    localStorage.setItem(propertyName, JSON.stringify(value));
}

export function getLocalStorageProperty(propertyName) {
    return JSON.parse(localStorage.getItem(propertyName));
}

export function resetInnerHTML(element) {
    element.innerHTML = "";
}

export function insertElement(parent, element) {
    parent.appendChild(element);
}
