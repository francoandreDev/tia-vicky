import { ErrorShowDefault } from "../../classes/Errors.js";
import { addInputEvent } from "./event-listeners.js";
import { localStorage } from "./global-variables.js";
import { capitalizeString } from "./stringFunctions.js";
import { fetchTemplate } from "./templates.js";

export function scrollTo(
    scrollConfig = { top: 0, left: 0, behavior: "smooth" }
) {
    window.scroll(scrollConfig);
}

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
            appendElement(element, template);
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
    let ms = 150;
    audio.play();
    audio.volume = 1;
    audio.currentTime = 0.65;
    setTimeout(() => {
        audio.pause();
    }, ms);
}

export function clickAudio(audio) {
    audio.play();
}

export function capitalizeTextInput(input) {
    let numberLetters = 0;
    addInputEvent(input, (e) => {
        if (e.data === null && numberLetters > 0) numberLetters--;
        if (e.data !== null) numberLetters++;
        input.value = capitalizeString(input.value);
    });
}
