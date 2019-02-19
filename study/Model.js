// Study 모듈
Study.Model = function (initName) {
    // Model 객체 파라미터
    var name = initName;
    
    // Model 객체 함수
    return{
        getName : function () {
            return name;
        },
        setName : function (newName) {
            name = newName;
        }
    }
}

// Model 객체 생성
const model = Study.Model("홍길동");
