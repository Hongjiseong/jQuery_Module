var LIST = LIST || {};

$(function () {
    // 전역 데이터
    LIST.Data = (function () {
        var pageNo = 1;

        return {
            getPageNo : function (){return pageNo;},
            setPageNo : function (no){pageNo = no}
        }
    })();

    // 데이터 요청 : 화면 -> 서버
    LIST.Request = (function(){
        var url = '/getXXXList.do';
        var params = [];
        var param = {};

        param.d1 = 'd1';
        param.d2 = 'd2';
        param.d3 = 'd3';

        params.push(param);

        return {
            submit : function(){
                ajaxSubmit(url, params);
            },
            callback : function(fromURL, ds){
                var list = ds.list;
                var pageCnt = ds.pageCnt;
                var dataCnt = ds.dataCnt;
            }
        };
    })();

    // 화면 이벤트
    LIST.View = (function(){
        $('document').on('click', '#DOM1', function(){

        });

        $('document').on('click', '#DOM2', function(){

        });

        $('document').on('click', '#DOM3', function(){

        });
    })();
});
