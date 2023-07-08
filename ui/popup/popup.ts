(document.querySelector("#perm-list") as HTMLElement).addEventListener("click", ()=>{
    browser.tabs.create({
        url:browser.runtime.getURL("../permissions/index.html"),
        active:true
    });
});