// sum
// Write a sum function that takes any number of arguments:

// sum(1, 2, 3, 4) === 10;
// sum(1, 2, 3, 4, 5) === 15;
// Solve it first using the arguments keyword, then rewrite your solution to use 
// the ...rest operator.

// function sum() {
//   let sum = 0; 

//   for (let i = 0; i < arguments.length; i++) {
//     sum += arguments[i];
//   }

//   return sum;
// }

function sum(...args) {
  let sum = 0; 

  for (let i = 0; i < args.length; i++) {
    sum += args[i];
  }

  return sum;
}

console.log(sum(1, 2, 3, 4));