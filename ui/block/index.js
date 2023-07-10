"use strict";
const reason = document.querySelector("#reason");
reason.innerHTML = "<span class=\"reason-main\">malicious</span>";
const continueBtn = document.querySelector("#continue");
continueBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (!confirm("Are you sure you want to continue to this page?"))
        return;
    const urlParams = new URLSearchParams(continueBtn.href);
    urlParams.set("webpp_continue", "true");
    const port = browser.runtime.connect();
    if (!port) {
        alert("Failed to continue to page. Try creating an issue on GitHub. Error: No valid port to background script.");
    }
    port.postMessage({
        type: "request/prevent-block",
        data: continueBtn.href,
        to: "background"
    });
    location.href = continueBtn.href.split("?")[0] + "?" + urlParams.toString();
});
