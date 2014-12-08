jQuery(function ($) {

    init();

    $('form#form').on('submit', function(e){
        save();
        return false;
    })
});

function init() {
    initExtraMenu();
}

function initExtraMenu() {
    $menuJson = localStorage.getItem('extra_menu');
    $('[name=extramenu]').val($menuJson);
}

function save() {
    saveExtraMenu();
    window.close();
}

function saveExtraMenu() {
    $menuJson = $('[name=extramenu]').val();
    localStorage.setItem('extra_menu', $menuJson);
}

