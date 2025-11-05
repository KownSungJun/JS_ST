//상속 Inheritance
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name}가 소리를 냅니다.`);
    }
}

class Dog extends Animal {
    speak() {
        console.log(`${this.name}가 멍멍! 짖습니다.`);
    }
}

const animal = new Animal("동물 1");
const dog = new Dog("흰둥이");
animal.speak();
dog.speak();

/**
 * 상속을 활용해 Animal 상위 클래스와 Dog 하위 클래스를 구현하고 speak 함수를 구현해
 * 다음과 같은 문장을 출력하시오.
 * 
 * 동물 1가 소리를 냅니다.
 * 흰둥이가 멍멍! 짖습니다.
 * 
 * 
 */