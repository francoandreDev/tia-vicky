export function addClickEvent(element, fn) {
    element.addEventListener("click", () => fn(), { passive: true });
}

export function addInputEvent(element, fn) {
    element.addEventListener("input", (e) => fn(e), { passive: true });
}
