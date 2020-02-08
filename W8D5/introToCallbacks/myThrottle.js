Function.prototype.myThrottle = function(interval) {
  let tooSoon = false;
  // let that = this;
  const throtFunc = (...args) => {
    // debugger
    if (!tooSoon) {
      tooSoon = true;
      setTimeout(() => {tooSoon = false;}, interval );
      this(...args);
    }
  }; 
  return throtFunc;
};

class Neuron {
  fire() {
    console.log("Firing!");
  }
}

const neuron = new Neuron();


// Using Function#myThrottle, we should be able to throttle
// the #fire function of our neuron so that it can only fire
// once every 500ms:

neuron.fire = neuron.fire.myThrottle(5000);

const interval = setInterval(() => {
  neuron.fire();
}, 10);
