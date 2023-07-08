"use strict";
function clickHandler() {
    browser.runtime.reload();
}
document.querySelector("button.update-btn")?.addEventListener("click", clickHandler);
