$(document).ready(function () {
    // Create Page sliding effect when clicking navbar buttons
    $("nav a").click(function (evn) {
        evn.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
    });
    
    $('#carousel-example-generic').carousel({
        interval: 6000
    });

    // handles the carousel thumbnails
    $('[id^=carousel-selector-]').click(function () {
        console.log("yay!");
        var id_selector = $(this).attr("id");
        var id = id_selector.substr(id_selector.length - 1);
        id = parseInt(id);
        $('#myCarousel').carousel(id);
        $('[id^=carousel-selector-]').removeClass('selected');
        $(this).addClass('selected');
    });

    // when the carousel slides, auto update
    $('#carousel-example-generic').on('slid.bs.carousel', function (e) {
        var carouselData = $(this).data('bs.carousel');
        var id = carouselData.getItemIndex(carouselData.$element.find('.item.active'));
        id = parseInt(id);
        $('[id^=carousel-selector-]').removeClass('selected');
        $('[id=carousel-selector-' + id + ']').addClass('selected');
    });
});

