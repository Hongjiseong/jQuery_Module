// 데이터 모듈
var Study = Study||{}
Study.RequestModule = function () {
    const listURL   = '/com/tdd/getList.do';
    const viewURL   = '/com/tdd/getView.do';
    const insertURL = '/com/tdd/insert.do';
    const updateURL = '/com/tdd/update.do';
    const deleteURL = '/com/tdd/delete.do';

    // 리턴 함수
    return {
        getList : function (options) {
            var param = {};

            param.pageSize = options.pageSize;
            param.pageNo   = options.pageNo;

        },
        getDetail : function () {
            var param = {};

            param.key = options.key;

        },
        insert : function (options) {
            var param = {};

            param.key   = options.key;
            param.data1 = options.data1;
            param.data2 = options.data2;
            param.data3 = options.data3;

        },
        update : function (options) {
            var param = {};

            param.key   = options.key;
            param.data1 = options.data1;
            param.data2 = options.data2;
            param.data3 = options.data3;

        },
        delete : function (options) {
            var param = {};

            param.key   = options.key;

        },
    }
}

