function Character (info) {
    //매개변수 info 넣어 속성 값 가져옴
    // this를 쓰는 이유 이 캐릭터 생성자의 속성으로 쓰겠다
    this.mainElem = document.createElement('div');
    this.mainElem.classList.add('character');
    this.mainElem.innerHTML = ''
        + '<div class="character-face-con character-head">'
            + '<div class="character-face character-head-face face-front"></div>'
            + '<div class="character-face character-head-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-torso">'
            + '<div class="character-face character-torso-face face-front"></div>'
            + '<div class="character-face character-torso-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-right">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-arm character-arm-left">'
            + '<div class="character-face character-arm-face face-front"></div>'
            + '<div class="character-face character-arm-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-right">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>'
        + '<div class="character-face-con character-leg character-leg-left">'
            + '<div class="character-face character-leg-face face-front"></div>'
            + '<div class="character-face character-leg-face face-back"></div>'
        + '</div>'

    document.querySelector('.stage').appendChild(this.mainElem);
    this.mainElem.style.left = info.xPos - 5 + '%' ;
    // 스크롤 중인지 아닌지
    this.scrollState = false;

    //바로 이전 스크롤 위치
    this.lastScrollTop = 0;
    this.xPos = info.xPos;
    this.speed = info.speed;
    this.direction;
    // 좌우이동 중인지 아닌지
    this.runningState = false;
    this.rafId;
    this.init();
}

// Character.prototype.xxxx = function(){};  포로토타입 객체에 추가하는것

// 프로토 타입 재구축 컨스트럭쳐 지정 필요
Character.prototype = {
    constructor: Character,
    init: function() {
        // 캐릭터를 가리키는 this를 이벤트 헨들러 밖에서 가져와야함 안그럼 윈도우 객체 가르킴
        const self = this;

        window.addEventListener('scroll', function(){
            this.clearTimeout(self.scrollState);

            if (!self.scrollState) {
                // 이곳에서의  this는 윈도우 객체
                self.mainElem.classList.add('running');
                console.log('클래스 붙음');
            }

            //0.5초를 기다려야 실행이 됨. 위의 스크롤중 clearTimeout이 계속 실행되기 때문에 
            // 스크롤시 작동되지 않는다.
            self.scrollState = this.setTimeout(function(){
                self.scrollState = false;
                self.mainElem.classList.remove('running');
            }, 500);

            // 이전 스크롤 위치와 현재 스크롤 위치를 비교
            if (self.lastScrollTop > this.pageYOffset) {
                // 이전 스크롤 위치가 크다면 : 스크롤 올림
                self.mainElem.setAttribute('data-direction', 'backward');

            } else {
                self.mainElem.setAttribute('data-direction', 'forward');
            }


            self.lastScrollTop = pageYOffset;
        });

        window.addEventListener('keydown', function(e){
            // console.log(e.keyCode); //키코드 확인
            if(self.runningState) return;

            if(e.keyCode == 37){
                //왼쪽
                self.direction = 'left';
                self.mainElem.setAttribute('data-direction', 'left');
                self.mainElem.classList.add('running');
                self.run(self);
                // self.run();
                // self.xPos -= self.speed;
                // self.mainElem.style.left = self.xPos + '%';
                self.runningState = true;
            }else if(e.keyCode == 39){
                //오른쪽
                self.direction = 'right';
                self.mainElem.setAttribute('data-direction', 'right');
                self.mainElem.classList.add('running');
                self.run(self);
                // self.run();
                self.runningState = true;
            }
        });

        window.addEventListener('keyup', function(e){
            self.mainElem.classList.remove('running');
            this.cancelAnimationFrame(self.rafId);
            self.runningState = false;
        });
    },
    run: function(self){
        if(self.direction == 'left'){
            self.xPos -= self.speed;
        }else if(self.direction == 'right'){
            self.xPos += self.speed;
        }

        if (self.xPos < 2){
            self.xPos = 2;
        }

        if (self.xPos > 88){
            self.xPos = 88;
        }

        self.mainElem.style.left = self.xPos + '%';

        self.rafId = requestAnimationFrame(function(){
            self.run(self);
        });
    }

    // bind 사용하여 this 로 가져오기
    //  run: function(){
    //     const self = this;

    //     if(self.direction == 'left'){
    //         self.xPos -= self.speed;
    //     }else if(self.direction == 'right'){
    //         self.xPos += self.speed;
    //     }

    //     self.mainElem.style.left = self.xPos + '%';

    //     self.rafId = requestAnimationFrame(self.run.bind(self));
    // }
};