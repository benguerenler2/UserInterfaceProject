/**
 * Called when the page is loaded and ready.
 * Sets the default language to be English.
 */
$.when($.ready).then(function () {
    if (localStorage.getItem("lang") === null) {
        localStorage.setItem("lang", "en");
        changeLanguage(localStorage.getItem("lang"));
    } else {
        changeLanguage(localStorage.getItem("lang"));
    }
});

/**
 * Function to change the global language. Firstly it sets the global language and then it calls
 * another function for every keyword that should be translated.
 *
 * @param newlanguage The new language.
 */
function changeLanguage(newlanguage) {
    localStorage.setItem("lang", newlanguage);

    translate('example', null);
    translate('basket', null);
    translate('view', null);
    translate('hometext', null);
    translate('bestseller', null);
    translate('fooddrinks', null);
    translate('footer', null);
    translate('ourbest', null);
    translate('browseall', null);
    translate('title', null);
    translate('se', null);
    translate('en', null);
    translate('home', null);
    translate('vip', null);
    translate('checkout', null);
    translate('paynow', null);
    translate('vipuser', "placeholder");
    translate('vippass', "placeholder");
    translate('login', "value")
    translate('viplogin', null);
    translate('back', null);
    translate('forward', null);
}

/**
 * Function to change the text in the elements that have the class name passed with the argument 'selector'.
 * Chooses the correct translation in the json file depending on the global language set.
 * If the text exists as an attribute in the element the attribute name can be passed
 * with the function.
 *
 * @param selector The unique identifier that should be found and translated.
 * @param attribute The attribute name of which value should be translated.
 */
function translate(selector, attribute) {
    if (document.getElementsByClassName('translate_' + selector) !== null) {
        var language = localStorage.getItem("lang");
        $.getJSON("../resources/translations.json", function (data) {
                $.each(data, function (key2, val) {
                    $.each(val, function (key, val) {
                        if (key == language && key2 == selector) {
                            if (attribute != null) {
                                var arr = document.getElementsByClassName("translate_" + selector);
                                for (var i = 0, len = arr.length; i < len; i++) {
                                    arr[i].setAttribute(attribute, val);
                                }
                                return false;
                            } else {

                                var arr = document.getElementsByClassName('translate_' + selector);
                                for (var i = 0, len = arr.length; i < len; i++) {
                                    arr[i].innerHTML = val;
                                }
                                return false;
                            }
                        }
                    });
                });
            }
        );
    }
}