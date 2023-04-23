const { createInterface } = require("readline");

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  rl.question(question, (answer) => {
    console.log(answer);
    rl.close();
  });
}

askQuestion("DO YOU WANT TO CONTINUE?? \n");
