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





    ///////////////////////////////////////////////////////
    // Handle form submissions


    // define validation techniques
    var val_name = new RegExp("^[a-zA-Z ]{0,100}$");
    var val_email = new RegExp("^[a-zA-Z0-9._%+-]+@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$");
    var val_address = new RegExp("^[a-zA-Z0-9-,. ]{0,150}$");
    var val_desc = new RegExp("^.{0,500}$");
  
    var validate = function(dom, rx){
        if( !rx.test(dom.val()) || dom.val() == "") {
            dom.closest('.form-group').addClass("has-error");
            return 1;
        } else{
            dom.closest('.form-group').removeClass("has-error");
            return 0;
        }
    }

    // Submit help
    $('#help-submit').click( function(event){
        event.preventDefault();

        var formErrors = 0;
        formErrors += validate($('#help-name'), val_name);
        formErrors += validate($('#help-email'), val_email);
        formErrors += validate($('#help-thoughts'), val_desc);
        
        if( !formErrors ){

            var data = {};
            data['name'] = $('#help-name').val();
            data['contact'] = $('#help-email').val();
            data['desc'] = $('#help-thoughts').val();
            data['type'] = $('#help-want_to').find("option:selected").text();

            $.post('/register/help', data, function(res){
                if( res == "success") {
                    $("#help-response_field").html("<h3>Thanks!</h3>");
                    $("#help-submit").attr("disabled","disabled");
                } else {
                    $("#help-response_field").html("<h3>Something went wrong :(</h3>");
                }
            });
        }
    });

    // Submit request
    $('#req-submit').click( function(event){
        event.preventDefault();

        var formErrors = 0;
        formErrors += validate($('#req-name'), val_name);
        formErrors += validate($('#req-address'), val_address);
        formErrors += validate($('#req-email'), val_email);
        
        if( !formErrors ){

        var data = {};
            data['name'] = $('#req-name').val();
            data['contact'] = $('#req-email').val();
            data['job_location'] = $('#req-address').val();
            data['job_desc'] = $('#req-description').val();
            data['job_type'] = $('#req-job_type').find("option:selected").text();

            $.post('/register/request', data, function(res){
                if( res == "success") {
                    $("#response_field").html("<h3>Thanks!</h3>");
                    $("#req-submit").attr("disabled","disabled");
                } else {
                    $("#response_field").html("<h3>Something went wrong :(</h3>");
                }
            });
        }
    });

});

