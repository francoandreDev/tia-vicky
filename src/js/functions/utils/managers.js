import { ErrorShowDefault } from "../../classes/Errors.js";
import { localStorage } from "./global-variables.js";
import { fetchTemplate } from "./templates.js";

export function dataJsonObjectManagement(
    query,
    jsonPath,
    createTemplate,
    name = ""
) {
    const element = document.querySelector(query);

    fetchTemplate(jsonPath, (res) => {
        res.forEach((props) => {
            if (name !== "") setLocalStorageProperty(name, res);
            const template = createTemplate(props);
            element.appendChild(template);
        });
    });
}

export function dataJsonArrayManagement(query, jsonPath) {
    const [...elements] = document.querySelectorAll(query);

    fetchTemplate(jsonPath, (res) => {
        elements.forEach((element, index) => {
            element.textContent = res[index];
        });
    });
}

export function setLocalStorageProperty(propertyName, value) {
    //? propertyName: string, value: any
    localStorage.setItem(propertyName, JSON.stringify(value));
}

export function getLocalStorageProperty(propertyName) {
    return JSON.parse(localStorage.getItem(propertyName));
}

export function resetInnerHTML(element) {
    element.innerHTML = "";
}

export function appendElement(parent, element) {
    parent.appendChild(element);
}

export function toggleClassElement(element, pos, ...values) {
    const stateClass = { current: "", prev: "" };
    stateClass.current = element.classList[pos];
    stateClass.prev = stateClass.current === values[0] ? values[1] : values[0]; //? toggle logic
    element.classList.replace(stateClass.current, stateClass.prev);
}

export function showError(e) {
    if (e instanceof ErrorShowDefault) alert(e.stack + "\n\nCausa: " + e.cause);
    else console.error(e);
    console.log(e.stack);
}

export function inputAudio(audio) {
    audio.play()
    setTimeout(() => {audio.pause()}, 200)
}

export function clickAudio(audio) {
    audio.play();
}