chrome.runtime.sendMessage({method: "getExtraMenu"}, function (response) {
    addLinkToMenu(response.extraMenus);
});

chrome.runtime.sendMessage({method: "getViewMode"}, function (response) {
    setWideView(response.showWide);
});

function addLinkToMenu(extraMenu) {

    jQuery.each(extraMenu, function (menu) {
        jQuery('ul.project-menu-nav.project-menu-gruop').append('<li><a class="label label-default" href="' + this.url + '">' + this.title + '</a></li>');
    })
}

function setWideView(showWide) {
    console.log(showWide);
    if(showWide == true) {
        jQuery('.project-page-wrap').css('width', '90%');
    }
    console.log(showWide);
}

function addDualViewButton() {
    var previewButtons = jQuery('.nav-tabs li a[data-mode=preview]');
    previewButtons.each(function () {
        var editorId = this.href.split('-').pop();
        var $dualView = jQuery('<li><a href="#dualview-' + editorId + '" data-toggle="tab" data-mode="dual">같이보기</a></li>');
        jQuery(this).parents('.nav-tabs').append($dualView);
    });
};

jQuery('.nav-tabs').on('click', 'a[data-mode=dual]', function (e) {
    var editorId = this.href.split('-').pop();
    var $this = jQuery(this);
    var box = $this.parents('div').find('.tab-pane, .textarea-box, .markdown-preview').addClass('dual');
    jQuery('a#preview-' + editorId).click();
});

jQuery('.nav-tabs').on('click', 'a[data-mode=preview],a[data-mode=edit]', function (e) {
    var $this = jQuery(this);
    var box = $this.parents('div').find('.tab-pane, .textarea-box, .markdown-preview').removeClass('dual');
});

addDualViewButton();

location.href = "javascript:(function(){ \
var c = ''; setInterval(function () {var welTextarea = jQuery('.textarea-box textarea:focus');if (welTextarea.length && c != (c = welTextarea.val())) {    var k = welTextarea.attr('id').split('-').pop();    welPreview = jQuery('#preview-' + k + ' .markdown-preview');    welPreview.html(yobi.Markdown.renderMarkdown(welTextarea.val())); height = Math.max(welPreview.height(), welTextarea.height());   welPreview.css({\"height\": height + 'px'}); welTextarea.css({\"height\": height + 'px'});}}, 1000); } \
)(); void 0";
/*
 var c = '';
 setInterval(function () {
 var welTextarea = jQuery('.textarea-box textarea:focus');
 if (welTextarea.length && c != (c = welTextarea.val())) {
 var k = welTextarea.attr('id').split('-').pop();
 welPreview = jQuery('#preview-' + k + ' .markdown-preview');
 welPreview.html(yobi.Markdown.renderMarkdown(welTextarea.val()));
 height = Math.max(welPreview.height(), welTextarea.height());
 welTextarea.css({"min-height": height + 'px'});
 welPreview.css({"min-height": height + 'px'});
 }
 }, 1000);
 */
