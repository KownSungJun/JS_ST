//클래스와 인스턴스
class Professor {
    //생성자
    constructor(name, class_name) {
        this.name = name;
        this.class_name = class_name;
    }
    //소개 말 함수
    introduce() {
        console.log(`안녕하세요, 저는 ${this.name} 교수이고, ${this.class_name}수업을 담당해요.`);
    }
    //채점 함수
    gradePapers() {
        console.log(`${this.name} 교수가 논문을 채점합니다.`);
    }
}

//인스턴스
const professorNam = new Professor("남희정", "알고리즘");
const professorKeum = new Professor("금소현", "서양화 실기");

//인스턴스 메소드
professorNam.introduce();
professorKeum.introduce();

/**
 * 
 * 클래스로 객체를 생성하여 introduce 메소드를 선언하여 다음과 같은 문장을 출력하시오.
 * 
 * 안녕하세요, 저는 남희정 교수이고, 알고리즘수업을 담당해요.
 * 안녕하세요, 저는 금소현 교수이고, 서양화 실기수업을 담당해요.
 */