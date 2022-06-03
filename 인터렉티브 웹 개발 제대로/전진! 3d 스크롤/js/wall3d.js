(function(){
    const stageElem = document.querySelector('.stage');
    const houseElem = document.querySelector('.house');
    const barElem = document.querySelector('.progress-bar');
    const selectCharacterElem = document.querySelector('.select-character');
    const mousePos = { x: 0, y : 0};

    // offsetHeight(문서 바디의 높이) - 윈도우 창 높이
    // console.log(document.body.offsetHeight - window.innerHeight)
    let maxScrollValue; 
    // let maxScrollValue = document.body.offsetHeight - window.innerHeight;
    // 중복 방지 

    function resizeHandler() {
        maxScrollValue = document.body.offsetHeight - window.innerHeight;
    }

    // 스크롤 시 비율만큼 스타일 줌
    window.addEventListener('scroll', function(){
        // 스크롤 양
        // console.log(pageYOffset);
        // 스크롤을 비율로 나타냄 0과 1로
        // console.log(pageYOffset / maxScrollValue);
        const scrollPer = pageYOffset / maxScrollValue // 사용성 위해 변수처리
        const zMove = scrollPer * 980 -490;
        houseElem.style.transform = 'translateZ(' + zMove + 'vw)';

        // 프로그래스 바
        barElem.style.width = scrollPer * 100 + '%';
    });

    window.addEventListener('mousemove', function(e){
        //마우스의 좌표
        // console.log(e.clientX,e.clientY) 
        mousePos.x = -1 + (e.clientX / window.innerWidth) * 2;
        mousePos.y = 1 - (e.clientY / window.innerHeight) * 2;
        stageElem.style.transform = 'rotateX('+(mousePos.y * 5)+'deg) rotateY('+(mousePos.x * 5)+'deg)';
    });

    // 윈도우 사이즈 바뀔 때마다 동작
    window.addEventListener('resize', resizeHandler);
    stageElem.addEventListener('click', function(e){
        new Character({
            // 속성 추가
            xPos: e.clientX / window.innerWidth * 100,
            speed: Math.random() * 0.5 + 0.2
        });

    });

    selectCharacterElem.addEventListener('click', function(e){
        const value = e.target.getAttribute('data-char');
        document.body.setAttribute('data-char', value);
    });

    resizeHandler(); // 초기화됨

    // 캐릭터 생성
})();