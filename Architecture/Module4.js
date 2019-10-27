// 공통 - 데이터 렌더링 프로세스
const Rendering = function(s, td, sd){
    const selectXXXData = s;
    const toDom = td;
    const setDom = sd;

    return {
        run: function(args){
            // 동기처리 - 콜백 (Promise, async, await 이용})
            selectXXXData(args)
            .then(toDom)
            .then(setDom)
            .then(handleSuccess)    // 성공함수에서 에러가 날 수 있기 때문에 이렇게 2중으로 보완해줍니다.
            .catch(handleError)     // Error 객체를 사용하는 것을 추천합니다.
        }
    }
}

// 페이지마다 1개씩 - UI 컨트롤 프로세스
const Board = function(){
    const render = {
        list: new Rendering(
            (args) => {
                return new Promise(function (resolve, reject) {
                    let data = args[0];
                    resolve(data);
                });
            },
            (data) => {
                return new Promise(function (resolve, reject) {
                    let boardData = data;
                    resolve(boardData);
                });
            },
            (dom) => {
                return new Promise(function (resolve, reject) {
                    let boardDomData = dom;
                });
            }
        ),
        sidebar: new Rendering(
            (args) => {
                return new Promise(function (resolve, reject) {
                    let data = args[0];
                    resolve(data);
                });
            },
            (data) => {
                return new Promise(function (resolve, reject) {
                    let sidebarData = data;
                    resolve(sidebarData);
                });
            },
            (dom) => {
                return new Promise(function (resolve, reject) {
                    let sidebarDomData = dom;
                });
            }
        )
    }
    
    // 렌더링을 제외한 DB 프로세스
    const data = {
        insertBoard: async function(){
            // 보드 내용 인서트 - 필요한 파라미터 : 보드 데이터 전부 : {}
            // 보드 파일 인서트 - 필요한 파라미터 : 파일 데이터 전부 : []
        },
        updateBoard: async function(){
            // 보드 내용 업데이트 - 필요한 파라미터 : 보드 데이터 전부 : {}
            // 보드 파일 업데이트 - 필요한 파라미터 : 파일 데이터 전부 : []
        },
        deleteBoard: async function(){
            // 서버 - 하나의 유알엘로 두가지 작업을 묶는 트랜잭션 코드를 작성해야합니다.
            // 보드 파일 딜리트 - 필요한 파라미터 : 파일 코드 + 보드 코드
            // 보드 내용 딜리트 - 필요한 파라미터 : 보드 코드
        }
    }

    // 동적 이벤트 부여
    $(document).on('click', '#insert', function(){
        data.insertBoard();
        render.list.run();
    });
    $(document).on('click', '#update', function(){
        data.updateBoard();
        render.list.run();
    });
    $(document).on('click', '#delete', function(){
        data.deleteBoard();
        render.list.run();
    });
}