var LIST = LIST || {};

$(function () {
    LIST.Data = function () {
        var d1='';
        var d2='';
        var d3='';

        return {
            d1 : d1,
            d2 : d2,
            d3 : d3
        }
    }

    LIST.Request = (function(){
        var options = {
            url:'/getXXXList.do',
            data:'',
            dataType:'',
            success:function (ds) {
                // ??
            },
            error:function(e) {
                console.log(e);
            }
        };

        return {
            submit : function(){
                $.ajax(options);
            }
        };
    })();

    LIST.View = (function(){
        $('document').on('click', '#DOM1', function(){

        });

        $('document').on('click', '#DOM2', function(){

        });

        $('document').on('click', '#DOM3', function(){

        });
    })();
});