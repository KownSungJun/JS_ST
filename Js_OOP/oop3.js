//캡슐화 Encapsulation
class Student {
    #year;
    constructor(name, year) {
        this.name = name; //학생 이름
        this.#year = year; //학년
    }

    //2학년 부터 양궁 수업을 들을 수 있음
    canTakeArchery() {
        return this.#year >= 2;
    }
}

const student1 = new Student("희정", 2);
const student2 = new Student("소현", 1);

console.log(student1.canTakeArchery());
console.log(student2.canTakeArchery());

/**
 * 캡슐화를 사용해 외부에서 학년을 접근하지 못하게 하고 2학년 부터 양궁 수업을 들을 수 있는지에 대한 함수를 선언해
 * 다음을 출력하시오.
 * 
 * true
 * false
 */