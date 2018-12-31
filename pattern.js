(function(window, document, $, undefined) {
    'use strict';
    $(document).ready(function($) {
        $(".pattern_class").keypress(function(event) {
        var pattern = $(this).attr('data-pattern');
        var patternDefault = $(this).attr('data-pattern-default');
        var className = $(this);
        var dot = 0;
        if(pattern.match(/[#]/gi) && pattern.match(/#/gi).length == pattern.length){ //#####
           numberOnly(className,patternDefault,dot,event);
        } else if (pattern.match(/[a-z]/gi) && pattern.match(/[a-z]/gi).length == pattern.length){ //ABC
            textOnly(className);
        }  else if (pattern == '##/##/####'){
            dateFormate(className);
        } else if (pattern.match(/[#]/gi) && pattern.match(/[%]/gi) && pattern.match(/[#]/gi).length == (pattern.length -(pattern.match(/[%]/gi).length))){ //##%
            numberOnly(className,patternDefault,dot,event);
        } else if (pattern.match(/[#]/gi) && pattern.match(/[$]/gi) && pattern.match(/[,]/gi) &&
            pattern.match(/[#]/gi).length == (pattern.length -(pattern.match(/[$]/gi).length)-(pattern.match(/[,]/gi).length))){//$##,###
            numberOnly(className,patternDefault,dot,event);
        } else if (pattern == 'fraction#') {//$##,###
            fractionCal(className);
        } else if (pattern.match(/[#]/gi) && pattern.match(/[,]/gi) && pattern.match(/[#]/gi).length == (pattern.length -(pattern.match(/[,]/gi).length))){ //##,###
            numberOnly(className,patternDefault,dot,event);
        } else if (pattern.match(/[#]/gi) && pattern.match(/[.]/gi) && pattern.match(/[,]/gi) && pattern.match(/[$]/gi) &&
            pattern.match(/[#]/gi).length == (pattern.length - (pattern.match(/[.]/gi).length) - (pattern.match(/[,]/gi).length) - (pattern.match(/[$]/gi).length))) { //$##,###.##
            dot = 1;
            numberOnly(className,patternDefault,dot,event);
        } else if (pattern.match(/[#]/gi) && pattern.match(/[.]/gi) && pattern.match(/[#]/gi).length == (pattern.length - (pattern.match(/[.]/gi).length))) { //##.###
            dot = 1;
            numberOnly(className,patternDefault,dot,event);
        } else if (pattern.match(/[#]/gi) && pattern.match(/[.]/gi) && pattern.match(/[%]/gi) &&
            pattern.match(/[#]/gi).length == (pattern.length - (pattern.match(/[%]/gi).length) - (pattern.match(/[.]/gi).length))) { //##.##%
            dot = 1;
            numberOnly(className,patternDefault,dot,event);
        } else if (pattern.match(/[#]/gi) && pattern.match(/[.]/gi) && pattern.match(/[,]/gi) &&
            pattern.match(/[#]/gi).length == (pattern.length -(pattern.match(/[.]/gi).length)-(pattern.match(/[,]/gi).length))){//##,###.##
            dot = 1;
            numberOnly(className,patternDefault,dot,event);
        }
        else if (pattern.match(/[#]/gi) && pattern.match(/[-]/gi)  &&
            pattern.match(/[#]/gi).length == (pattern.length - (pattern.match(/[-]/gi).length))) { //-(minus)####
            dot = 1;
            numberOnly(className,patternDefault,dot,event);
        }
        else {
            console.log('end of keypress:No validation found');
        }
    });


    $(".pattern_class").blur(function(event) {
        var pattern = $(this).attr('data-pattern');
        var className = $(this);
        if(className.val() != '' && pattern.length > 0)
        {
            if (pattern.match(/[#]/gi) && pattern.match(/#/gi).length == pattern.length) {
                //Nothing happen
            } else if (pattern.match(/[#]/gi) && pattern.match(/[%]/gi) && pattern.match(/[#]/gi).length == (pattern.length - (pattern.match(/[%]/gi).length))) { //##
                numberWithPercent(className);
            }  else if (pattern.match(/[#]/gi) && pattern.match(/[$]/gi) && pattern.match(/[,]/gi) &&
                pattern.match(/[#]/gi).length == (pattern.length - (pattern.match(/[$]/gi).length) - (pattern.match(/[,]/gi).length))) {//$##,###
                numberWithRoundOff(className);
            } else if (pattern.match(/[#]/gi) && pattern.match(/[.]/gi) && pattern.match(/[#]/gi).length == (pattern.length - (pattern.match(/[.]/gi).length))) { //##.###
                numberWithDot(className,pattern);
            } else if (pattern.match(/[#]/gi) && pattern.match(/[.]/gi) && pattern.match(/[,]/gi) && pattern.match(/[$]/gi) &&
                pattern.match(/[#]/gi).length == (pattern.length - (pattern.match(/[.]/gi).length) - (pattern.match(/[,]/gi).length) - (pattern.match(/[$]/gi).length))) { //$##,###.##
                numberWithcommasWithDecimal(className,pattern);
            } else if (pattern.match(/[#]/gi) && pattern.match(/[.]/gi) && pattern.match(/[%]/gi) &&
                pattern.match(/[#]/gi).length == (pattern.length - (pattern.match(/[%]/gi).length) - (pattern.match(/[.]/gi).length))) { //##.##%
                numberWithDecimalWithoutDoller(className,pattern);
            } else if (pattern.match(/[#]/gi) && pattern.match(/[,]/gi) && pattern.match(/[#]/gi).length == (pattern.length - (pattern.match(/[,]/gi).length))) { //##,###
                numberWithCommas(className);
            }else if (pattern == 'fraction#') {//$##,###
                fractionCal(className);
            } else if (pattern.match(/[#]/gi) && pattern.match(/[.]/gi) && pattern.match(/[,]/gi) &&
                pattern.match(/[#]/gi).length == (pattern.length -(pattern.match(/[.]/gi).length)-(pattern.match(/[,]/gi).length))){//##,###.##
                numberWithcommasWithDecimalWithoutDoller(className,pattern);
            }
            else if (pattern.match(/[#]/gi) && pattern.match(/[-]/gi)  &&
                pattern.match(/[#]/gi).length == (pattern.length - (pattern.match(/[-]/gi).length))) { //-(minus)####
                numberWithMinus(className);
            }
            else {
                console.log('end of blur:No Validation found');
            }
        }
    });


    function numberOnly(className,patternDefault,dot,event) {
        var getValue = className.val().replace(/[,$,%,.,-]/g, '');
        if(dot == 1){
            var num = 46;
        }else{
            var num = 48;
        }
        if (event.keyCode == 8) {
            // let it happen, don't do anything
        }
        else {
            // Ensure that it is a number and stop the keypress
            var patternDefault = patternDefault.split(',');
            for (var i = 0; i < patternDefault.length; i++) {
                var patternDefaultResult = patternDefault[i].split('');
                var chr = event.key.toUpperCase();
                    if (patternDefault[i].split('')[$(className).val().length] == chr) {
                            className.val(className.val()+chr);
                            event.preventDefault();
                            return false;
                    }else{
                        if ( event.which < num || event.which > 57) {
                            event.preventDefault();
                        }else if(!($.isNumeric(getValue)) && getValue != ""){
                            event.preventDefault();
                        }else{

                        }
                    }
            }
        }
    }

    function textOnly() {
        if (event.keyCode >= 48 && event.keyCode <= 57) {
            event.preventDefault();
        }
    }

    function numberWithCommas(className) {
        var getValue = className.val().replace(/[,$]/g, '');
        if($.isNumeric(getValue)) {
            if (getValue != '') {
                   var parts = getValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    className.val(parts);
            }
        }
    }

    function dateFormate(className) {
        if(event.which !== 8) {
            var numChars = className.val().length;
            if(numChars === 2 || numChars === 5){
                var thisVal = className.val();
                thisVal += '/';
                className.val(thisVal);
            }
            if(numChars === 10){
                event.preventDefault();
            }
        }
    }

    function numberWithDot(className,pattern) {
        var dotCount = pattern.split(".").pop().length;
        className.val(parseFloat(className.val()).toFixed(dotCount));
        if($.isNumeric(className.val())) {
            if (event.keyCode == 46 || event.keyCode == 8) {
                // let it happen, don't do anything
            }
            else {
                // Ensure that it is a number and stop the keypress
                if (event.keyCode < 48 || event.keyCode > 57) {
                    event.preventDefault();
                }
            }
        }
    }

    function numberWithDoller(className) {
        if($.isNumeric(className.val())) {
            if (className.val().indexOf('$') == -1) {
                className.val('$' + className.val());
            }
        }
    }

    function numberWithPercent(className) {
        if($.isNumeric(className.val())) {
            if (className.val() != '') {
                if (className.val().indexOf('%') == -1) {
                    className.val(className.val() + '%');
                }
            }
        }
    }

    function numberWithRoundOff(className) {
        var roundValue = Math.round(className.val().replace(/[,$]/g, ''));
        if($.isNumeric(roundValue)) {
            if (roundValue != '') {
                if (className.val().indexOf('$') == -1) {
                    var parts = roundValue.toString().split(".");
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    className.val('$' + parts.toString());
                } else {
                    className.val('$' + roundValue);
                    var parts = roundValue.toString().split(".");
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    className.val('$' + parts.toString());
                }
            }
        }
    }

    function numberWithcommasWithDecimal(className,pattern) {
        var getValue = className.val().replace(/[,$]/g, '');
        var dotCount = pattern.split(".").pop().length;
        getValue = parseFloat(getValue).toFixed(dotCount);
        if($.isNumeric(getValue)) {
            if (getValue != '') {
                if (className.val().indexOf('$') == -1) {
                    var parts = getValue.toString().split(".");
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    var join = parts.join(".");
                    className.val('$' + join);
                } else {
                    var parts = getValue.toString().split(".");
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    var join = parts.join(".");
                    className.val('$' + join);
                }
            }
        }
    }

    function numberWithcommasWithDecimalWithoutDoller(className,pattern) {
        var getValue = className.val().replace(/[,$]/g, '');
        var dotCount = pattern.split(".").pop().length;
        getValue = parseFloat(getValue).toFixed(dotCount);
        if($.isNumeric(getValue)) {
            if (getValue != '') {
                if (className.val().indexOf('$') == -1) {
                    var parts = getValue.toString().split(".");
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    var join = parts.join(".");
                    className.val(join);
                } else {
                    var parts = getValue.toString().split(".");
                    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    var join = parts.join(".");
                    className.val(join);
                }
            }
        }
    }

    function numberWithDecimalWithoutDoller(className,pattern) {
        var getValue = className.val().replace(/[,%]/g, '');
        var dotCount = pattern.split(".").pop().length-1;
        getValue = parseFloat(getValue).toFixed(dotCount);
        if($.isNumeric(getValue)) {
            if (getValue != '') {
                if (className.val().indexOf('%') == -1) {
                    className.val(getValue + '%');
                } else {
                    className.val(getValue + '%');
                }
            }
        }
    }

    function fractionCal(className) {
        var str = className.val();
         str = str.replace(/[-]/g, '');
        if (str.match(/[/]/gi) && str.match(/[ ]/gi) && str.match(/[0-9]/gi).length == (str.length -(str.match(/[/]/gi).length)-(str.match(/[ ]/gi).length))){
            if (str.indexOf('/') != -1) {
                var parts = str.split(" ")
                var subParts = parts[1].split("/")
		className.val(parseInt(parts[0]) + (parseInt(subParts[0]) / parseInt(subParts[1])));
            } else {
                className.val(str);
            }
        }else {
            className.val(eval(str));
        }
    }

    function numberWithMinus(className){
        var getValue = className.val().replace(/[,-]/g, '');
        if($.isNumeric(getValue)) {
            if (getValue != '') {
                if (className.val().indexOf('-') == -1) {
                    className.val('-' + getValue);
                } else {
                    className.val('-' + getValue);
                }
            }
        }
        

    }
    });
})(window, document, jQuery);
