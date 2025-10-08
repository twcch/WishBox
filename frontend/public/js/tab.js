$(document).ready(function () {
    /*無障礙 tab切換*/
    $("#news-more").focusout(function () {
        $("#nav-events-tab").focus();
        $("#nav-events-tab").trigger('click');/*觸發 點擊:nav-events-tab*/
    });

    $("#health-more").focusout(function () {
        $("#nav-newstxt-tab").focus();
        $("#nav-newstxt-tab").trigger('click');
    });
    $("#book-more").focusout(function () {
        $("#yt").focus();
        $("#nav-newstxt-tab").trigger('click');
    });
    $('#news-more').click(function () {
        window.location.href = encodeHTML('<!--- $news_more --->');
    });
    $('#health-more').click(function () {
        ;
        window.location.href = encodeHTML('<!--- $health_more --->');
    });
    $('#book-more').click(function () {
        window.location.href = encodeHTML('<!--- $book_more --->');
    });

});

function encodeHTML(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}