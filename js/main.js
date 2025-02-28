"use strict";

document.addEventListener("readystatechange", (event) => {

    if (event.target.readyState === "complete") {

        if ($(".os-radio-option").length > 0) {
            document.querySelectorAll(".os-radio-option").forEach(element => {
                element.addEventListener("change", function (e) {
                    checkRadioButton();
                    checkSelectedRadioButton();
                });
            });

            checkRadioButton();
            checkSelectedRadioButton();
        }

        if ($("#saveAndExit").length > 0) {
            $("#saveAndExit").bind("click", function () {
                var input = $("<input>")
                    .attr("type", "hidden")
                    .attr("name", "exit").val("1");
                $('#questionForm').append($(input));
                $('#submitButton').click();
                $('#multiSubmitButton').click();

            });
        }

        if ($('input[name="__FormSubmissionId"]').length > 0) {
            if (!sessionStorage.getItem("sessionCreated") && $('input[name="__FormSubmissionId"]').val()) {
                sessionStorage.setItem("sessionCreated", "true");
            }
        }

        if ($('input[name="serviceType"]').length > 0) {
            if (sessionStorage.getItem("sessionCreated")) {
                $('input[name="serviceType"]').attr("disabled", "disabled");
            }
        }

        if ($(".os-checkbox-option").length > 0) {
            document.querySelectorAll(".os-checkbox-option").forEach(element => {
                element.addEventListener("change", function (e) {
                    checkCheckBoxButton();
                    checkSelectedCheckBoxButton();
                });
            });

            checkCheckBoxButton();
            checkSelectedCheckBoxButton();
        }

        if ($("#referenceCode_acceptanceCheckBox").length > 0) {
            $("#referenceCode_acceptanceCheckBox").change(function (e) {
                if (e.target.checked) {
                    $('.btn-continue').removeClass("disabled");
                }
                else {
                    $('.btn-continue').addClass("disabled");
                }
            });
            if (sessionStorage.getItem("sessionCreated")) {
                $("#referenceCode_acceptanceCheckBox")[0].checked = true;
                $("#referenceCode_acceptanceCheckBox").attr("disabled", "disabled");
            }

            $("#referenceCode_acceptanceCheckBox").change();
        }

        if ($(".reference-no-input").length > 0) {
            $(".reference-no-input").on('change keyup', function (e) {
                if (e.target.value)
                    $('.btn-continue').removeClass("disabled");
                else
                    $('.btn-continue').addClass("disabled");
            });

            $(".reference-no-input").keyup();
        }

        if ($(".os-service-type").length > 0) {
            $(".os-service-type").change(function () {
                if ($('input[name="serviceType"]:checked').length > 0) {
                    $('.btn-continue').removeClass("disabled");
                } else {
                    $('.btn-continue').addClass("disabled");
                }
            });

            $(".os-service-type").change();
        }
    }
})


$(document).ready(function () {

    if ($('.checker-container').length > 0) {
        $('.checker-container').each(function () {
            $(this).parents().addClass('height-100');
        });
        if ($('.checker-container').length) {
            $('header').addClass('position-absolute');
            $('#help-section').addClass('position-absolute');
            $('#back-button').addClass('back-button');
        }
    }

    if ($(".copy-clipboard").length > 0) {
        if (document.querySelector(".copy-clipboard")) {
            document.querySelector(".copy-clipboard").addEventListener("click", function (e) {
                navigator.clipboard.writeText(e.currentTarget.getAttribute("data-referenceCode"));
            });
        }
    }

    if ($(".btn-referenceCode").length > 0) {
        if (document.querySelector(".btn-referenceCode")) {
            document.querySelector(".btn-referenceCode").addEventListener("click", function (e) {
                var referenceCode = document.querySelector(".reference-no-input").value

                if (referenceCode)
                    checkReferenceCode(e.target.getAttribute("data-pageurl"), referenceCode, e.target.getAttribute("data-redirectUrl"));

            });
        }
    }

    if ($(".referenceCode-display").length > 0) {
        if (document.querySelector(".referenceCode-display")) {
            var code = $(".referenceCode-display").attr("data-referenceCode");
            var hiddenElementId = $(".referenceCode-display").attr("data-hidden-elementid");

            if (!sessionStorage.getItem("referenceCode")) {
                sessionStorage.setItem("referenceCode", code);
            }

            $(".copy-clipboard").attr("data-referenceCode", sessionStorage.getItem("referenceCode"))
            $(`#${hiddenElementId}`).val(sessionStorage.getItem("referenceCode"));
            $(".referenceCode-display").text(sessionStorage.getItem("referenceCode"));
            $("#referenceNumber").val(sessionStorage.getItem("referenceCode"));
        }
    }

    // Sub Navigation
    $(".sub-nav-overview-link").click(function () {
        checkSubNavContent();
        $(".sub-nav-content").show();

        checkSubNavRightContent();
        var elementId = this.getAttribute('data-value');
        if (elementId != null) {
            $("." + elementId + "-title").addClass("active");
            $(".sub-nav-right-content").show();
            $("#" + elementId).show();
            localStorage['SubNavPosition'] = elementId;
        }

        checkSubNavBack();        
    });

    $(".sub-nav-subsec-link").click(function () {
        checkSubNavContent();

        checkSubNavRightContent();
        $(this).addClass("active");
        var elementId = this.getAttribute('data-value');
        if (elementId != null) {
            $(".sub-nav-right-content").show();
            $("#" + elementId).show();
            localStorage['SubNavPosition'] = elementId;
        }

        checkSubNavBack();
    });

    $(".sub-nav-continue").click(function (event) {
        checkSubNavContent();

        checkSubNavRightContent();
        var elementId = this.getAttribute('data-value');
        if (elementId != null) {
            $("." + elementId + "-title").addClass("active");
            $(".sub-nav-right-content").show();
            $("#" + elementId).show();
            localStorage['SubNavPosition'] = elementId;
        }

        checkSubNavBack();
    });

    $(".sub-nav-sec-link").click(function () {
        checkSubNavOverview();

        var elementId = this.getAttribute('data-value');
        if (elementId != null) {
            localStorage['SubNavPosition'] = "null";
            $('html, body').animate({
                scrollTop: $("#" + elementId).offset().top
            }, 0);
        }
    });

    $(".sub-nav-back-button").click(function () {
        localStorage['SubNavPosition'] = "null";
        checkSubNavOverview();
    });

    if ($(".task-list-section").length > 0) {
        localStorage['SubNavPosition'] = "null";
    }

    $(".clear-sub-nav-position").click(function () {
        localStorage['SubNavPosition'] = "null";
    });

    if (localStorage['SubNavPosition'] !== "null") {
        if ($("#" + localStorage['SubNavPosition']).length > 0) {
            checkSubNavPosition();
        }
    }

});

function checkSubNavPosition() {
    if (localStorage['SubNavPosition'] !== "null") {
        var elementId = localStorage['SubNavPosition'];
        if (elementId != null) {
            checkSubNavContent();
            $(".sub-nav-content").show();
            checkSubNavRightContent();

            $("." + elementId + "-title").addClass("active");
            $(".sub-nav-right-content").show();
            $("#" + elementId).show();
            localStorage['SubNavPosition'] = elementId;

            checkSubNavBack();
        }
    }
}

function checkSubNavOverview() {
    $(".sub-nav-content").hide();
    $(".sub-nav-title").show();
    $(".sub-nav-overview").show();
    $(".sub-nav-subsec-link").removeClass("active");

    $(".os-back-button").show();
    $(".sub-nav-back").hide();
}

function checkSubNavContent() {
    $(".sub-nav-title").hide();
    $(".sub-nav-overview").hide();
    $(".sub-nav-subsec-link").removeClass("active");
}

function checkSubNavRightContent() {
    $(".sub-nav-right-content").hide();
    $(".sub-nav-right-content-item").hide();
}

function checkSubNavBack() {
    $(window).scrollTop(0);
    $(".os-back-button").hide();
    $(".sub-nav-back").show();
}

// Single Choice Question
function checkRadioButton() {
    if (document.querySelector('.os-radio-option')) {
        if (document.querySelector('.os-radio-option:checked')) {
            document.getElementById(`submitButton`).classList.remove("disabled");
        }
        else {
            document.getElementById(`submitButton`).classList.add("disabled");
        }
    }
}

function checkSelectedRadioButton() {
    document.querySelectorAll(".content_div").forEach(div => { div.classList.add("hidden"); });
    $('.os-radio-option:checked').each(function () {
        const elementid = $(this).attr("id");

        if ($(`${elementid}_content`).length > 0) {
            $(`${elementid}_content`).classList.toggle("hidden");
        }
      
    });
    if ($(".os-radio-option:checked").val()) {
        $("#os-rf-pb-title").show();
    }
}

// Multi Choice Question
var isNoneChecked = false;
function checkCheckBoxButton() {
    if (document.querySelector('.os-checkbox-option')) {
        if (document.querySelector('.os-checkbox-option:checked')) {
            document.getElementById(`submitButton`).classList.remove("disabled");
            $('.os-checkbox-option:checkbox:checked').each(function () {
                if ($(this).val().toLowerCase() == "none" && isNoneChecked == false) {
                    unCheckOtherCheckBox($(this).attr("id"))
                    isNoneChecked = true;
                }
                else if ($(this).val().toLowerCase() == "none" && isNoneChecked == true) {
                    const elementid = $(this).attr("id");
                    $(`#${elementid}`).prop("checked", false);
                    document.getElementById(`${elementid}_content`).classList.toggle("hidden");
                    isNoneChecked = false;
                }
            });
        }
        else {
            document.getElementById(`submitButton`).classList.add("disabled");
        }
    }
}

function unCheckOtherCheckBox(id) {
    $('.os-checkbox-option:checkbox:checked').each(function () {
        if ($(this).attr("id") != id && isNoneChecked == false) {
            const elementid = $(this).attr("id");
            $(`#${elementid}`).prop("checked", false);
            document.getElementById(`${elementid}_content`).classList.toggle("hidden");
        }
    });
}

function checkSelectedCheckBoxButton() {
    document.querySelectorAll(".content_div").forEach(div => { div.classList.add("hidden"); });
    $('.os-checkbox-option:checkbox:checked').each(function () {
        const elementid = $(this).attr("id");
        document.getElementById(`${elementid}_content`).classList.toggle("hidden");
    });

    if ($(".os-checkbox-option:checked").val()) {
        $("#os-rf-pb-title").show();
    }
    else {
        document.querySelectorAll(".content_div").forEach(div => { div.classList.add("hidden"); });
        $("#os-rf-pb-title").hide();
    }
}

// User Assessment Type
function submitUserTypeSelection() {
    const selectedAssessmentType = document.querySelector('input[name="assessmentType"]:checked');
    if (selectedAssessmentType) {
        const url = selectedAssessmentType.value;
        if (url) {
            window.location.href = url;
        }
    }
}

// Reference Code
function checkReferenceCode(pageUrl, referenceCode, redirectUrl) {
    $.ajax({
        type: "POST",
        url: `${pageUrl}CheckReferenceCode?referenceCode=${referenceCode}`,
        data: referenceCode,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.isSucceed) {
                if (response.result != null && response.result.length == 2) {
                    window.location.href = redirectUrl + "?id=" + response.result[0] + "&type=" + response.result[1];
                }
                else {
                    document.querySelector(".reference-no-input").classList.add("input-error")
                    document.querySelector("#text-error").style.display = "block";
                    document.querySelector("#ErrorMessage").style.display = "block";
                }
            }
            else {
                document.querySelector(".reference-no-input").classList.add("input-error")
                document.querySelector("#text-error").style.display = "block";
                document.querySelector("#ErrorMessage").style.display = "block";
            }
        }
    });
}

// Measures
function show_measures(id) {
    $('#safety-measures-' + id).removeClass('d-none');
    $('#measures').hide();
}
function all_measures(id) {
    $('#safety-measures-' + id).addClass('d-none');
    $('#measures').show();
}
function next_measures(id) {
    $('#safety-measures-' + id).removeClass('d-none');
    $('#safety-measures-' + (id - 1)).addClass('d-none');
}

$(document).ready(function () {

    function checkScroll() {
        $('.checker-container').each(function () {
            var topHeader = $('.header').height();
            var footerHeight = $('.qn-stepper').height();
            var checkerContainer = $('.checker-container').height();

            var $firstDiv = $(this);
            var $secondDiv = $firstDiv.find('.checker-container-left-inner');

            if (($(document).height() - 10) < (topHeader + footerHeight + checkerContainer) && $(window).width() < 1280) {
                $secondDiv.addClass('height-auto');
            } else {
                $secondDiv.removeClass('height-auto');
            }
        });
    }

    checkScroll();

    $(window).resize(function () {
        checkScroll();
    });
});

$(document).ready(function () {
    var textboxId = $('.form-control.reference-no-input.updateLabelFor').attr('id');
    $('#hdnLabel').attr('for', textboxId);
    $('#hdnLabel').text('Enter Reference Code:');
});

$(document).ready(function () {
    function checkMultiRadioSelection() {
        let allSelected = true;
        let selectedData = [];
        const radioGroups = new Set($('.illegalharm-elements input[type="radio"]').map(function () {
            return this.name;
        }).get());

        radioGroups.forEach(function (group) {
            const checkedRadio = $('input[name="' + group + '"]:checked');
            if (checkedRadio.length === 0) {
                allSelected = false;
            } else {
                selectedData.push(group + ':' + checkedRadio.val());
            }
        });

        $('.selectedValues').val(selectedData.join('|'));

        if (allSelected) {
            $('#multiSubmitButton').removeClass('disabled').addClass('enabled').prop('disabled', false);
        } else {
            $('#multiSubmitButton').addClass('disabled').removeClass('enabled').prop('disabled', true);
        }
    }

    checkMultiRadioSelection();

    $('.illegalharm-elements input[type="radio"]').change(checkMultiRadioSelection);
});
