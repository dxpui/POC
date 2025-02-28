"use strict";

function searchIcon() {
    $('#search-icon').click(function () {
        $('#search-icon i').toggleClass("fa-times");
        $('.search-form').toggleClass("active");
        $(".menu").removeClass("fa-times");
    })
    $('.search-icons').keypress(function (event) {
        var id = event.keyCode;
        if (id == 13) {
            $('#search-icon').trigger('click');
        }
    });
}

$(document).ready(function () {
    if ($('#search-icon').length > 0) {
        searchIcon()
    }
});

$(document).ready(function() {
    $('.checker-container').each(function() {
        $(this).parents().addClass('height-100');
    });

    if ($('.checker-container').length) {
        // $('body').addClass('position-relative');
        $('header').addClass('position-absolute');
    }

    // $('.checker-container-left-inner').each(function() {
    //     var $this = $(this);
    //     if ($this[0].scrollHeight > $this.innerHeight() || $this[0].scrollWidth > $this.innerWidth()) {
    //         $this.addClass('height-auto');
    //     }
    // });
});

// $(document).ready(function() {
//     function checkScroll() {
//         $('.checker-container').each(function() {
//             var topHeader = $('.header').height();
//             var footerHeight  = $('.qn-stepper').height();
//             var checkerContainer  = $('.checker-container').height();

//             var $firstDiv = $(this);
//             var $secondDiv = $firstDiv.find('.checker-container-left-inner');

//             if (($(document).height() - 10) < (topHeader + footerHeight + checkerContainer) && $(window).width() < 1280) {
//                 $secondDiv.addClass('height-auto');
//             } else {
//                 $secondDiv.removeClass('height-auto');
//             }
//         });
//     }

//     checkScroll();

//     $(window).resize(function() {
//         checkScroll();
//     });
// });
