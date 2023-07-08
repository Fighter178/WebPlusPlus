browser.runtime.onConnect.addListener(async(port)=>{
    // Extract window object from tab.
    const sender = port.sender
    const tab = sender?.tab;
    if(!sender) {port.disconnect(); return;};
    if(!tab) {port.disconnect();return;};
    if(!tab.id) {port.disconnect();return;};
    port.onMessage.addListener(async(message)=>{
        const msg = message as Message;
        console.log(msg);
    });
});

interface Message {
    type:string
    data:any
};

(async()=>{
    // Prevent privacy settings from being changed by other extensions / users.
    // Don't control in incognito mode.
    // TODO  Provide a UI that allows user to change settings.
    // TODO  Create a new tab when a privacy setting is changed, and provide a button to accept or deny changes.
    
    const httpsOnlyMode =  (await browser.privacy.network.httpsOnlyMode.get({}));
    const networkPredictionEnabled = (await browser.privacy.network.networkPredictionEnabled.get({}));
    if(httpsOnlyMode.levelOfControl === "controllable_by_this_extension" || httpsOnlyMode.levelOfControl === "controlled_by_this_extension") {
        browser.privacy.network.httpsOnlyMode.onChange.addListener((change)=>{
            if(change.value !== httpsOnlyMode) {
                console.log("Reverting change of httpsOnlyMode.");
                browser.privacy.network.httpsOnlyMode.set({
                    value:httpsOnlyMode.value
                });
            };
        });
    } else {
        console.warn("Cannot prevent httpsOnlyMode from being changed.");
        console.log("Control Level: ", httpsOnlyMode.levelOfControl);
    }
    if(networkPredictionEnabled.levelOfControl === "controllable_by_this_extension" || networkPredictionEnabled.levelOfControl === "controlled_by_this_extension") {
        browser.privacy.network.networkPredictionEnabled.onChange.addListener((change)=>{
            if(change.value !== networkPredictionEnabled.value) {
                console.log("Reverting change of networkPredictionEnabled.");
                browser.privacy.network.networkPredictionEnabled.set({
                    value:networkPredictionEnabled.value
                });
            };
        });
    } else {
        console.warn("Cannot prevent networkPredictionEnabled from being changed.");
        console.log("Control level: ", networkPredictionEnabled.levelOfControl);
    };
    // Improve popup blocking.
    // Don't persist to allow user to change.
    browser.browserSettings.allowPopupsForUserEvents.set({
        value:false
    });
    browser.browserSettings
})();