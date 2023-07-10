"use strict";
document.querySelector("#perm-list").addEventListener("click", () => {
    browser.tabs.create({
        url: browser.runtime.getURL("../ui/permissions/index.html"),
        active: true
    });
});
