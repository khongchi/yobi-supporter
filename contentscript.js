jQuery(function ($) {

    function setWideView(showWide) {
        console.log(showWide);
        if (showWide == true) {
            $('.project-page-wrap').css('width', '90%');
        }
        console.log(showWide);
    }

    function addDualViewButton() {
        var previewButtons = $('.nav-tabs li a[data-mode=preview]');
        previewButtons.each(function () {
            var editorId = this.href.split('-').pop();
            var $dualView = $('<li><a href="#dualview-' + editorId + '" data-toggle="tab" data-mode="dual">같이보기</a></li>');
            $(this).parents('.nav-tabs').append($dualView);
        });
    };

    function addLinkToMenu(extraMenu) {

        $.each(extraMenu, function (menu) {
            $('ul.project-menu-nav.project-menu-gruop').append('<li><a class="label label-default" href="' + this.url + '">' + this.title + '</a></li>');
        })
    }

    function refreshMarkdown(k) {
        location.href = "javascript:(function(){ " +
        "$('#preview-" + k + " .markdown-preview').html(yobi.Markdown.renderMarkdown($('.tab-pane#edit-" + k + " textarea').val()));"
        + "})(); void 0";
    }

    function adjustElementHeight(element, padding) {
        var scrollHeight = element.prop('scrollHeight');
        var clientHeight = element.prop('clientHeight');
        if (scrollHeight > clientHeight) {
            element.height(scrollHeight - padding);
        }
        return scrollHeight;
    }

    function syncHeight(welTextarea, welPreview) {
        var textareaHeight = adjustElementHeight(welTextarea, 20);
        var previewHeight = adjustElementHeight(welPreview, 8);

        var height = Math.max(textareaHeight, previewHeight);
        welTextarea.height(height - 20);
        welPreview.height(height - 8);
    }

    chrome.runtime.sendMessage({method: "getExtraMenu"}, function (response) {
        addLinkToMenu(response.extraMenus);
    });

    chrome.runtime.sendMessage({method: "getViewMode"}, function (response) {
        setWideView(response.showWide);
    });


    $('.nav-tabs')
        .on('click', 'a[data-mode=dual]', function (e) {
            var editorId = this.href.split('-').pop();
            var box = $(this).closest('div').find('.tab-pane').addClass('dual').end();
            var textarea = box.find('.textarea-box').addClass('dual');
            var preview = box.find('.markdown-preview').addClass('dual');
            refreshMarkdown(editorId);
            syncHeight(textarea, preview);
        })
        .on('click', 'a[data-mode=preview],a[data-mode=edit]', function (e) {
            $(this).parents('div').find('.tab-pane, .textarea-box, .markdown-preview').removeClass('dual');
        });

    addDualViewButton();

    var c = '';

    setInterval(function () {
        var welTextarea = $('.textarea-box.dual textarea:focus');
        if (welTextarea.length) {
            var k = welTextarea.attr('id').split('-').pop();
            var welPreview = $('#preview-' + k + ' .markdown-preview');
            if (c != (c = welTextarea.val())) {
                refreshMarkdown(k);
            }
            syncHeight(welTextarea, welPreview);
        }

    }, 1000);
});
