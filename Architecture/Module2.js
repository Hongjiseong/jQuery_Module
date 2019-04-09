var Module = Module || {}

Module.LogLevel = 'DEBUG';

Module.Pop = function(){
    var opener = '';

    var defaultOptions = {
        width:200,
        height:400
    }

    return {
        openPop : function(){
            var centerX = ($(window).width() - defaultOptions.width)/2;
            var centerY = ($(window).height() - defaultOptions.height)/2;
    
            opener = window.open(
                url,
                name,
                'channelmode=no,fullscreen=no,width='+width
                +',height='+height
                +',left='+centerX
                +',top='+centerY
                +',location=no,menubar=no,resizable=no,scrollbars=yes,status=no,toolbar=no,titlebar=yes'
                ,false
            );   
        },
        setList : function(){
            $('#target').val(opener.document.get);
        }
    }
}

Module.UI = function(requestM, validM){
    var triggerDOM = {
        tDOM : $('#tDOM')
    }

    var ui = {
        show : function(){
            
        }
    }

    triggerDOM.tDOM.on('click', function(){
        if(validM.isValid()){
            ui.show();
            requestM.submit();
        }
    })

    return {
        info : [
            {
                DOM_Name : '#tDOM', 
                Event : [
                    {name : 'click', description : {ui_event : "", request_event : ""}},
                    {name : 'keyup', description : {ui_event : "", request_event : ""}},
                    {name : 'keydown', description : {ui_event : "", request_event : ""}}
                ]
            }
        ]
    }
}

Module.Request = function(dataM){
    var callback = {
        getListCallback : function(data){
            var updateDOM = {
                uDOM : $('#uDOM')
            }

            var list = data.list;
            $.each(list, function(index, object){
                var row = $('<tr></tr>');
                
                var col_1 = $('<td></td>').append(object.col_1);
                var col_2 = $('<td></td>').append(object.col_2);
                var col_3 = $('<td></td>').append(object.col_3);
                
                row.append(col_1)
                   .append(col_2)
                   .append(col_3);
                
                updateDOM.uDOM.append(row.clone());
            });
        }
    }

    var submit = {
        getList : function(){
            var sessionInfo = sessionStorage.getItem('mInfo');
            var refDOM = {
                rDOM : $('#rDOM')
            }

            var parameters = {
                id : sessionInfo.id,
                content : dataM.convert(refDOM.val())
            }

            $.ajax({
                url : '/getList.m',
                type: "POST",
                data : parameters,
                dataType : 'json',
                success : callback.getListCallback,
                error : function (request, status, error){
                    console.log("요청 에러");
                    console.log(" - url     = "+ url);
                    console.log(" - code    = "+ status);
                    console.log(" - message = "+ request.responseText);
                    console.log(" - error   = "+ error);
                }
            });
        }
    }

    return {
        submit : submit
    }
}

Module.Data = function(){
    return {
        convert : function(data){
            return '(' + data + ')'
        }
    }
}

Module.Validation = function(){
    return {
        isValid = function(data){
            var result = /ab+c111/.exec(data);
            if(result == null){
                return false;
            }else{
                return true;
            }
        }
    }
}

$(function(){
    const dataM = Module.Data();
    const validM = Module.Validation();
    const requestM = Module.Request(dataM, validM);
    const uiM = Module.UI(requestM, validM);
    console.log(uiM.info);
})