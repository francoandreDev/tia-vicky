import { soundsPath } from "./global-variables.js";
import { clickAudio, inputAudio } from "./managers.js";

export function addClickEvent(
    element,
    fn,
    sound = soundsPath + "click-classic.wav"
) {
    const audio = new Audio(sound);
    element.addEventListener(
        "click",
        () => {
            fn();
            clickAudio(audio);
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
