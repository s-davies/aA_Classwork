Array.prototype.uniq = function () {
  let arr = [];
  let orig_arr = this;
  for (let index = 0; index < this.length; index++) {
    const element = this[index];
    if (!arr.includes(element)) {
      arr.push(element);
    }
  }
  return arr;
}

Array.prototype.twoSum = function () {
  let pairs = [];
  for (let index = 0; index < this.length; index++) {
    const element = this[index];
    let opisite_val = this[index] * -1;
    let sliced = this.slice(index + 1, this.length);
    if (sliced.includes(opisite_val)) {
      
      pairs.push([index, this.lastIndexOf(opisite_val) ]);
    }
  
  }

  return pairs;

}

//[1,2,-1,4,2,3,-4].twoSum(); = [[0,2],[3,6]]
//[1,0,-1,4,2,3,-4].twoSum(); = [[0,2],[3,6]]
//[1,0,-1,4,0,3,-4].twoSum(); = [[0,2], [1,4],[3,6]]

Array.prototype.transpose = function () {
  let result = [];
  for (let index = 0; index < this.length; index++) {
    let temp = [];
    for (let i = 0; i < this.length; i++) {
      temp.push(this[i][index])
    }
    result.push(temp);
  }
  return result;
}

//[[1,2], [3,4]].transpose(); = [[1,3]. [2,4]]

Array.prototype.myEach = function (callFunc) {
  for (let index = 0; index < this.length; index++) {
    callFunc(this[index]);
  }
}

const cb = function (idx) {
  return idx + 5;
}

const cb2 = function (idx) {
  console.log(idx + 1);
}

const cb3 = function(acc, el) {
  return acc + el;
}
const cb4 = function(acc, el) {
  return acc * el;
}

Array.prototype.myMap = function(callback) {
  let arr = [];
  this.myEach((el) => arr.push(callback(el)));
  return arr;
}

Array.prototype.myReduce = function (callback, initialValue = null) {
  let acc = initialValue;
  if (initialValue) {
    this.myEach(el => acc = callback(acc, el));
  } else {
    acc = this[0];
    this.slice(1, this.length).myEach(el => acc = callback(acc, el));
  }
  return acc;
}