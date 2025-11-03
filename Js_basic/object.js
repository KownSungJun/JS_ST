
const name = 'sungjun';
const age = 4;
const sungJun = {name: 'sungjun', age : 4};
print(sungJun);
function print(person) {
    console.log(person.name);
    console.log(person.age);
}


//object = {key : value};


//중괄호를 이용해 object 생성
const obj1 = {}; //object literal syntax

//class의 new 키워드를 이용해 object 생성
const obj2 = new Object(); //object constructor syntax

sungJun.hasJob = true;
console.log(sungJun.hasJob);

delete sungJun.hasJob;
console.log(sungJun.hasJob);