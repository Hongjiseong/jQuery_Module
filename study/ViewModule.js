// 뷰 모듈
var Study = Study||{}
Study.ViewModule = function (dataModule, options) {
    // 업데이트 DOM
    var updateDOM = options.updateDOM;
    
    // 트리거 DOM
    var triggerDOM = options.triggerDOM;

    var view = {
        ajaxCall : function (){
            dataModule.ajaxCall(function () {
                var div = $('<div></div>')
                div.text(div);
                updateDOM.append(div.clone());
            });
        }
    };

    // 트리거 이벤트 적용
    triggerDOM.on('click', function () {
        var allText = dataModule.printDOM();
        updateDOM.html(allText);
        view.ajaxCall();
    });
    
    // 리턴 함수
    return view;
}