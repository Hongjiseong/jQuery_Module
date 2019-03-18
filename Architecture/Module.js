// Module
var Module = Module || {};

// LogLevel : DEBUG
Module.LogLevel = 'DEBUG';

// Module - UI
Module.UI = (function () {
    // DOM1 - Event (Dynamic DOM + Static DOM)
    $('document').on('click', '#DOM1', function(){
        // Validation Check
        var data = $(this).val();
        var isNotValid = !Module.Validation.vali_dom1(data);
        if(isNotValid){
            return false;
        }

        // DOM1 - UI
        console.log('Set Dynamic UI Event!');
        $(this).css('width', '300px');

        // DOM1 - Data Request
        Module.Request.select();
    });
})();

// Module - Request
Module.Request = (function () {
    // AJAX - submit(options)
    var submit = function (o) {
        $.ajax({
            url : o.url,
            type: "POST",
            data : o.parameters,
            dataType : o.dataType,
            success : o.success,
            error : function (request, status, error){
                console.log("요청 에러");
                console.log(" - url     = "+ url);
                console.log(" - code    = "+ status);
                console.log(" - message = "+ request.responseText);
                console.log(" - error   = "+ error);
            }
        });
    }

    // AJAX
    return {
        select : function () {
            // RefferenceDOM
            var referDOM = {
                dom1 : $('#r_dom1'),
                dom2 : $('#r_dom2'),
                dom3 : $('#r_dom3')
            }

            // UpdateDOM
            var updateDOM = {
                dom1 : $('#u_dom1'),
                dom2 : $('#u_dom2'),
                dom3 : $('#u_dom3')
            }

            // AJAX Options
            var ajaxOptions = {
                url : '/select.do',
                dataType : 'json',
                parameters : {
                    param1 : refDOM.dom1.val(),
                    param2 : refDOM.dom2.html(),
                    param3 : Module.Data.convertParameterData_1(refDOM.dom3.val())
                },
                success : function (result){
                    // Conver the result data
                    var convertResult = Module.Data.convertData_1(result);

                    // DEBUG LOG
                    if(Module.LogLevel == 'DEBUG'){
                        console.log('결과 데이터');
                        console.log(result);
                    }

                    // Update DOM
                    updateDOM.dom1.val(convertResult.value1);
                    updateDOM.dom2.val(convertResult.value2);
                    updateDOM.dom3.html(convertResult.value3);
                }
            }

            // AJAX Submit
            submit(ajaxOptions);
        }
    }
})();

// Module - Data
Module.Data = (function () {
    return {
        // Data - Convert Parameter
        convertParameterData_1 : function (paramData) {
            return paramData + 'convert param1'
        },
        // Data - Convert CallbackData
        convertResultData_1 : function (resultData) {
            resultData.addmessage = 'convert result1'
            return resultData;
        }
    }
})();

// Module - Validation
Module.Validation = (function () {
    return {
        // Validate Data
        vali_dom1 : function (data) {
            var result = /ab+c111/.exec(data);
            if(result == null){
                return false;
            }else{
                return true;
            }
        }
    }
})();

