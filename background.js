$menuJson = localStorage.getItem('extramenu');

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getExtraMenu") {
        var extraMenus = localStorage['extra_menu'];

        if(extraMenus == undefined) extraMenus = [];
        else extraMenus = JSON.parse(extraMenus);

        sendResponse({extraMenus: extraMenus});
    }

    else
        sendResponse({}); // snub them.
});

/*chrome.tabs.executeScript(null, {code: "addLinkToMenu('" + $menuJson + "')"});
chrome.tabs.executeScript(null, {code: "console.log('hi');"});*/
