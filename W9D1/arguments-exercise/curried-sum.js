function curriedSum(numArgs) {
  let numbers = [];

  return function _curriedSum(num) {
    numbers.push(num);

    if (numbers.length === numArgs) {
      let sum = 0;

      for (let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
      }

      return sum;
    } else {
      return _curriedSum;
    }
  };
}


const sum = curriedSum(4);
console.log(sum(5)(30)(20)(1)); // => 56

console.log(curriedSum(4)(5)(30)(20)(1));

Function.prototype.curry = function(numArgs, context) {
  if (!context) {
    context = null;
  }

  let numbers = [];
  let that = this;

  return function _curriedSum(num) {
    numbers.push(num);

    if (numbers.length === numArgs) {
      // return that(...numbers);
      return that.apply(context, numbers); //=> add.apply(null, [1, 2]);
    } else {
      return _curriedSum;
    }
  };
};

function add (num1, num2) {
  return num1 + num2;
}

class Cat {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    let args = [...arguments];
    console.log(`Hi, I'm ${this.name}`);

    for (let i = 0; i < args.length; i++) {
      console.log(`And I like ${args[i]}`);
    }
  }
}

let boots = new Cat('boots');
// boots.sayHello();
boots.sayHello.curry(3, boots)('pizza')('tacos')('sleeping');

console.log(add.curry(2)(1)(2));

