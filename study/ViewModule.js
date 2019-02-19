// 뷰 모듈
Study.ViewModule = function (dataModule, options) {
    // 업데이트 DOM
    var updateDOM = options.updateDOM;
    
    // 트리거 DOM
    var triggerDOM = options.triggerDOM;
    
    // 리턴 함수
    return {
        // 트리거 이벤트 적용
        setTriggerEvent : function () {
            triggerDOM.on('click', function () {
                var allText = dataModule.printDOM();
                updateDOM.html(allText);
            });
        },

        // AJAX 요청 후 DOM 업데이트 
        ajaxCall : function (){
            dataModule.ajaxCall(function () {
                var div = $('<div></div>')
                div.text(div);
                updateDOM.append(div.clone());
            });
        }
    }
}