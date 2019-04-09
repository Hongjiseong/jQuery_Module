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
        }
    }
})();

Module.Request = function(){
    var submit = function(url, parameters, callback){
        $.ajax({
            url:'/selectList.html',
            type: "POST",
            data : parameters,
            dataType : 'json',
            success : callback,
            error : function (request, status, error){
                console.log("요청 에러");
                console.log(" - url     = "+ url);
                console.log(" - code    = "+ status);
                console.log(" - message = "+ request.responseText);
                console.log(" - error   = "+ error);
            }
        })
    }

    var callback = {
        'selectList' : function(data){
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
        'selectOne' : function(data){
            var updateDOM = {
                no : $('[data-name="no"]'),
                hits : $('[data-name="hits"]'),
                regdate : $('[data-name="regdate"]'),
                writer : $('[data-name="writer"]'),
                title : $('[data-name="title"]'),
                content : $('[data-name="content"]')
            }


        },
        'update' : function(data){
            var refDOM = {
                hits : $('[data-name="hits"]'),
                title : $('[data-name="title"]'),
                content : $('[data-name="content"]')
            }
        },
        'insert' : function(data){
            var refDOM = {
                no : $('[data-name="no"]'),
                hits : $('[data-name="hits"]'),
                regdate : $('[data-name="regdate"]'),
                writer : $('[data-name="writer"]'),
                title : $('[data-name="title"]'),
                content : $('[data-name="content"]')
            }
        },
        'delete' : function(data){
            var refDOM = {
                no : $('[data-name="no"]')
            }
            
        }
    }

    return {
        'selectList' : function(pageNo){
            var refDOM = {
                searchType : $('#searchType option:selected'),
                searchKeyword : $('#searchKeyword')
            }

            var params = {}
            params.pageNo = Module.Data.getPageData().currentPage;
            params.pageSize = Module.Data.getPageData().pageSize;
            params.searchType = refDOM.searchType.val();
            params.searchKeyword = refDOM.searchKeyword.val();

            submit('/selectList.do', parameters, callback.selectList);
        },
        'selectOne' : function(){

        },
        'update' : function(){

        },
        'insert' : function(){

        },
        'delete' : function(){

        }
    }
}