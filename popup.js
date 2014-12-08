jQuery(function ($) {

    init();

    $('form#form').on('submit', function (e) {
        save();
        return false;
    })
});

function init() {
    initExtraMenu();
    initWideView();
}

function initExtraMenu() {
    var menuJson = localStorage.getItem('extra_menu');
    $('[name=extramenu]').val(menuJson);
}

function initWideView() {
    var wideview = localStorage.getItem('wideview');
    if (wideview == 'true') {
        $('[name=wideview]').prop('checked', true);
    } else {
        $('[name=wideview]').prop('checked', false);
    }
}

function save() {
    saveExtraMenu();
    saveWideView();
    window.close();
}

function saveExtraMenu() {
    var menuJson = $('[name=extramenu]').val();
    localStorage.setItem('extra_menu', menuJson);
}

function saveWideView() {

    var wideview = $('[name=wideview]').prop('checked');
    localStorage.setItem('wideview', wideview);
}

