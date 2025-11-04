const readline = require('readline');
let user1_input = 0;
let user2_input = 0;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('낼 것을 선택하세요 1. 가위 | 2. 바위 | 3. 보', (answer) => {
    user1_input = answer;
    if (user1_input == '1') {
        console.log(`user1님의 선택 : ${answer}. 가위`);
    }

    else if (user1_input == '2') {
        console.log(`user1님의 선택 : ${answer}. 바위`);
    }

    else if (user1_input == '3') {
        console.log(`user1님의 선택 : ${answer}. 보`);
    }

    rl.question('낼 것을 선택하세요 1. 가위 | 2. 바위 | 3. 보', (answer) => {
        user2_input = answer;
        if (user2_input == '1') {
            console.log(`user2님의 선택 : ${answer}. 가위`);
        }

        else if (user2_input == '2') {
            console.log(`user2님의 선택 : ${answer}. 바위`);
        }

        else if (user2_input == '3') {
            console.log(`user2님의 선택 : ${answer}. 보`);
        }

        if(user1_input == '1' && user2_input == '2') {
            console.log()
        }
        rl.close();
    });
});


