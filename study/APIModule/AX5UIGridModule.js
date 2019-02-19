// API 모듈 - ax5-ui-grid.js
var Study = Study||{}
Study.AX5UIGridModule = function () {
    // 참조 DOM
    var refDOM = {
        dom1:$('#dom1'),
        dom2:$('.dom2'),
        dom3:$('body .dom3').eq(0)
    };

    // 리턴 함수
    return {
        // 프린트 이벤트
        printDom : function () {
            return refDOM.dom1.text() + refDOM.dom12.text() + refDOM.dom3.text()
        },
        
        // AJAX 요청 (추가적인 조절 필요)
        ajaxCall : function (callback) {
            $.ajax({
                type:"POST",
                url:'./time.do',
                data: {
                    dom1 : dom1.val(),
                    dom2 : dom2.val(),
                    dom3 : dom3.val()
                },
                dataType : "json",
                success: callback,
                error: function(xhr, status, error) {
                    console.log(error);
                }
            });
        }
    }
}