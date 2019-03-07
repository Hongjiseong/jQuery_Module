// Module
var Module = Module || {};

// LogLevel : 디버깅모드 - DEBUG
Module.LogLevel = 'DEBUG';

// Module - UI
Module.UI = (function () {
    // DOM1 - Event (동적 생성태그에도 적용되는 이벤트 적용방식)
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

    // AJAX - 분야별 요청함수
    return {
        select : function () {
            // AJAX 파라미터에 필요한 DOM 객체
            var refDOM = {
                dom1 : $('#r_dom1'),
                dom2 : $('#r_dom2'),
                dom3 : $('#r_dom3')
            }

            // AJAX - success 콜백 데이터를 이용하여, 업데이트할 DOM 객체
            var updateDOM = {
                dom1 : $('#u_dom1'),
                dom2 : $('#u_dom2'),
                dom3 : $('#u_dom3')
            }

            // AJAX 옵션
            var ajaxOptions = {
                url : '/select.do',
                dataType : 'json',
                parameters : {
                    param1 : refDOM.dom1.val(),
                    param2 : refDOM.dom2.html(),
                    param3 : Module.Data.convertParameterData_1(refDOM.dom3.val())
                },
                success : function (result){
                    // 결과데이터 가공
                    var convertResult = Module.Data.convertData_1(result);

                    // DEBUG모드 로그
                    if(Module.LogLevel == 'DEBUG'){
                        console.log('결과 데이터');
                        console.log(result);
                    }

                    // 데이터를 가지고 DOM 객체들을 업데이트
                    updateDOM.dom1.val(convertResult.value1);
                    updateDOM.dom2.val(convertResult.value2);
                    updateDOM.dom3.html(convertResult.value3);
                }
            }

            // AJAX - submit
            submit(ajaxOptions);
        }
    }
})();

// Module - Data
Module.Data = (function () {
    return {
        // Data - 파라미터 가공
        convertParameterData_1 : function (paramData) {
            return paramData + 'convert param1'
        },
        // Data - 콜백데이터 가공
        convertResultData_1 : function (resultData) {
            resultData.addmessage = 'convert result1'
            return resultData;
        }
    }
})();

// Module - Validation
Module.Validation = (function () {
    return {
        // Data 검증
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

