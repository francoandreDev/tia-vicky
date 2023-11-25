import { soundsPath } from "./global-variables.js";
import { clickAudio, inputAudio } from "./managers.js";

export function addClickEvent(
    element,
    fn,
    sound = soundsPath + "click-classic.wav",
    bubble = true
) {
    const audio = new Audio(sound);
    element.addEventListener(
        "click",
        (e) => {
            if ((bubble === false && e.target === element) || bubble) {
                fn();
                clickAudio(audio);
            }
        },
        { passive: true }
    );
}

export function addInputEvent(element, fn) {
    const typingAudio = new Audio(soundsPath + "typing-hard.wav");
    element.addEventListener(
        "input",
        (e) => {
            fn(e);
            inputAudio(typingAudio);
        },
        { passive: true }
    );
}
