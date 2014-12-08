chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method == "getExtraMenu") {
        var extraMenus = localStorage['extra_menu'];

        if (extraMenus == undefined) extraMenus = [];
        else extraMenus = JSON.parse(extraMenus);

        sendResponse({extraMenus: extraMenus});
    }
    else if (request.method == "getViewMode") {
        var showWide = localStorage['wideview'];

        if (showWide == undefined) showWide = false;
        else showWide = JSON.parse(showWide);

        sendResponse({showWide: showWide});
    }
    else
        sendResponse({}); // snub them.
});

/*chrome.tabs.executeScript(null, {code: "addLinkToMenu('" + $menuJson + "')"});
 chrome.tabs.executeScript(null, {code: "console.log('hi');"});*/
