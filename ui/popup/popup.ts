(document.querySelector("#perm-list") as HTMLElement).addEventListener("click", ()=>{
    browser.tabs.create({
        url:browser.runtime.getURL("../ui/permissions/index.html"),
        active:true
    });
});