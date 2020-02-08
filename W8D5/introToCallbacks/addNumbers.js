const readline = require('readline');

const reader = readline.createInterface({ input: process.stdin, output: process.stdout });

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question('Enter a number', (num) => {
      let pNum = parseInt(num);
      sum += pNum;
      console.log(sum);
      addNumbers(sum, numsLeft - 1, completionCallback);
    });
  } else {
    completionCallback(sum);
  }

}

addNumbers(0, 3, sum => {
  console.log(`Total Sum: ${sum}`)
  reader.close();
}
  );