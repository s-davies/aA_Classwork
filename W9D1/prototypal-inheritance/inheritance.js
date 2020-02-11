// inherits

Function.prototype.inherits = function(parentClass) {
  function Surrogate() {}
  Surrogate.prototype = parentClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
}

// Function.prototype.inherits = function (Parent) {
//   this.prototype = Object.create(Parent.prototype);
//   this.prototype.constructor = this;
// };

//

function MovingObject() { }

MovingObject.prototype.makeSound = function() {
  console.log(this.sound);
};

//

function Ship(sound) { 
  this.sound = sound;
}

Ship.inherits(MovingObject);

Ship.prototype.shoot = function() {
  console.log(`Shoots!!! ${this.sound} ${this.sound}`);
};

//

function Asteroid(sound, size) { 
  this.sound = sound;
  this.size = size;
}

Asteroid.inherits(MovingObject);

Asteroid.prototype.crash = function() {
  console.log(`A ${this.size} asteroid crashes into YOU!!!!`);
};

//

ourShip = new Ship('DAKA');
ourAsteroid = new Asteroid('whoosh', 'large');
anotherObject = new MovingObject();

ourShip.makeSound();
ourShip.shoot();

ourAsteroid.makeSound();
ourAsteroid.crash();
