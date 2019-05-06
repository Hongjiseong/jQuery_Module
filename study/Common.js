// getURLParams : GET 방식으로 넘겨준 파라미터를 반환합니다.
function getURLParams(){
    var GETParams = GETParams || {}
    
    var url = location.href
    var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&')
    
    for (var i = 0; i < parameters.length; i++) {
        var key = parameters[i].split('=')[0]
        var value = parameters[i].split('=')[1]
        GETParams[key] = value
    }

    return GETParams;
}ㅍ

// getAjaxOption : Ajax 리퀘스트에 필요한 파라미터를 셋팅 후 submit 으로 요청을 실행한다.
function getAjaxOption(){
    var option ={
        url : '',
        type : '',
        data : '',
        dataType : '',
        success : function(){},
        error : function (request, status, error){
            console.log("Request Error");
            console.log(" - url     = "+ url);
            console.log(" - code    = "+ status);
            console.log(" - message = "+ request.responseText);
            console.log(" - error   = "+ error);
        }
    }

    return {
        setURL : function(url){
            option.url = url;
            return this;
        },
        setType : function(type){
            option.type = type;
            return this;
        },
        setData : function(data){
            option.data = data;
            return this;
        },
        setDataType : function(dataType){
            option.dataType = dataType;
            return this;
        },
        setCallback : function(callback){
            option.success = callback;
            return this;
        },
        submit : function(){
            $.ajax(option);
        }
    }
}