class movingObject {
  constructor(sound) {
    this.sound = sound;
  }

  makeSound() {
    console.log(this.sound);
  }
}

class Ship extends movingObject {
  constructor(sound, speed) {
    super(sound);
    this.speed = speed;
  }

  shoot() {
    console.log(`Shoots!!! ${this.sound} ${this.sound}`);
  }
}

class Asteroid extends movingObject {
  constructor(sound, size) {
    super(sound);
    this.size = size;
  }

  crash() {
    console.log(`A ${this.size} asteroid crashes into you!`);
  }
}

ship = new Ship('DAKA', 'FAST');
asteroid = new Asteroid('whoosh', 'large');
object = new movingObject('zoom');

ship.makeSound();
asteroid.makeSound();
object.makeSound();

ship.shoot();
asteroid.crash();