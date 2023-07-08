"use strict";
const port = browser.runtime.connect();
port.onDisconnect.addListener((p) => {
    console.error("DISCONNECT");
});
port.onMessage.addListener((message) => {
    const msg = message;
});
