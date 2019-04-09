var Module = Module || {}

Module.Data = (function(){
    var pageData = {
        currentPage : 1,
        pageSize : 10
    }

    return {
        getPageData : function(){
            return pageData;
        },
        setCurrentPage : function(page){
            pageData.currentPage = page;
        }
    }
})();

Module.Validation = (function(){
    var regex = {
        id_check : /^$/
    }

    return {
        isValid_ID : function(id){
            return regex.id_check.test(id);
        },
        isNotSuccess : function(status){
            return status != '200'
        }
    }
})();

Module.Request = function(){
    var checkServerError = function(data){
        if(isNotSuccess(data.status)){
            location.href = '/error.html?resultCode=' + data.resultCode;
        }
    }

    var submit = function(url, parameters, callback){
        $.ajax({
            url : url,
            type : "POST",
            data : parameters,
            dataType : 'json',
            success : callback,
            error : function (request, status, error){
                console.log("Request Error");
                console.log(" - url     = "+ url);
                console.log(" - code    = "+ status);
                console.log(" - message = "+ request.responseText);
                console.log(" - error   = "+ error);
            }
        })
    }

    var callback = {
        'selectListCallback' : function(data){
            checkServerError(data);
            var updateDOM = {
                tbody : $('#tbody')
            }
            
            $.each(data.list, function(index, object){
                var tr = $('<tr></tr>');
                var no = $('<td></td>').append(object.no);
                var title = $('<td></td>').append(object.title);
                var writer = $('<td></td>').append(object.writer);
                var regdate = $('<td></td>').append(object.regdate);

                tr.append(no)
                  .append(title)
                  .append(writer)
                  .append(regdate);
                
                updateDOM.tbody.append(tr.clone());
            });

            
        },
        'selectOneCallback' : function(data){
            checkServerError(data);
            var updateDOM = {
                no : $('[data-name="no"]'),
                hits : $('[data-name="hits"]'),
                regdate : $('[data-name="regdate"]'),
                writer : $('[data-name="writer"]'),
                title : $('[data-name="title"]'),
                content : $('[data-name="content"]')
            }

            var info = data.info;
            sessionStorage.setItem('selectOnePK', info.id);
            updateDOM.no.val(info.no);
            updateDOM.hits.val(info.hits);
            updateDOM.regdate.val(info.regdate);
            updateDOM.writer.val(info.writer);
            updateDOM.title.val(info.title);
            updateDOM.content.val(info.content);
        },
        'updateCallback' : function(data){
            checkServerError(data);
            alert('Update Success');
        },
        'insertCallback' : function(data){
            checkServerError(data);
            alert('Insert Success');
        },
        'deleteCallback' : function(data){
            checkServerError(data);
            alert('Delete Success');
        }
    }

    return {
        'selectList' : function(pageNo){
            var refDOM = {
                searchType : $('#searchType option:selected'),
                searchKeyword : $('#searchKeyword')
            }

            var params = {}
            params.pageNo = pageNo || Module.Data.getPageData().currentPage;
            params.pageSize = Module.Data.getPageData().pageSize;
            params.searchType = refDOM.searchType.val();
            params.searchKeyword = refDOM.searchKeyword.val();

            submit('/selectList.do', parameters, callback.selectListCallback);
        },
        'selectOne' : function(){
            var refDOM = {
                searchType : $('#searchType option:selected'),
                searchKeyword : $('#searchKeyword')
            }

            var params = {}
            params.pageNo = Module.Data.getPageData().currentPage;
            params.pageSize = Module.Data.getPageData().pageSize;
            params.searchType = refDOM.searchType.val();
            params.searchKeyword = refDOM.searchKeyword.val();

            submit('/selectOne.do', parameters, callback.selectOneCallback);
        },
        'update' : function(){
            var refDOM = {
                hits : $('[data-name="hits"]'),
                writer : $('[data-name="writer"]'),
                title : $('[data-name="title"]'),
                content : $('[data-name="content"]')
            }

            var parameters = {};
            parameters.id = sessionStorage.getItem('selectOnePK');
            parameters.hits = refDOM.hits.val();
            parameters.writer = refDOM.writer.val();
            parameters.title = refDOM.title.val();
            parameters.content = refDOM.content.val();

            submit('/update.do', parameters, callback.updateCallback);
        },
        'insert' : function(){
            var refDOM = {
                title : $('[data-name="title"]'),
                content : $('[data-name="content"]')
            }

            var parameters = {};
            parameters.writer = JSON.parse(sessionStorage.getItem('userInfo')).userId;
            parameters.title = refDOM.title.val();
            parameters.content = refDOM.content.val();

            submit('/insert.do', parameters, callback.insertCallback);
        },
        'delete' : function(){
            var parameters = {};
            parameters.id = sessionStorage.getItem('selectOnePK');

            submit('/delete.do', parameters, callback.deleteCallback);
        }
    }
}

Module.UI = function(request){
    var triggerDOM = {
        searchButton : $('[data-action="search"]'),
        title : $('[data-action="view"]'),
        saveButton : $('[data-action="save"]'),
        registButton : $('[data-action="regist"]'),
        deleteButton : $('[data-action="delete"]'),
        pageButton : $('[data-action="page"]')
    }

    triggerDOM.searchButton.on('click', function(){
        request.selectList();
    });

    triggerDOM.title.on('click', function(){
        request.selectOne();
    });

    triggerDOM.saveButton.on('click', function(){
        request.update();
    });

    triggerDOM.registButton.on('click', function(){
        request.insert();
    });

    triggerDOM.deleteButton.on('click', function(){
        request.delete();
    });

    triggerDOM.pageButton.on('click', function(){
        request.selectList($(this).val());
    });
}

$(function(){
    var request = Module.Request();
    Module.UI(request);
})