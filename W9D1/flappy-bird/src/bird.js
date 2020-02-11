const CONSTANTS = {
  GRAVITY: 0.8,
  FLAP_SPEED: -8,
  TERMINAL_VEL: 12,
  BIRD_WIDTH: 40,
  BIRD_HEIGHT: 30
};

export default class Bird {
  constructor(dimensions) {
    this.velocity = 0;
    this.dimensions = dimensions;
    this.x = (Math.floor((this.dimensions.width-CONSTANTS.BIRD_WIDTH) / 3));
    this.y = ((this.dimensions.height-CONSTANTS.BIRD_HEIGHT) / 2);
  }

  drawBird(ctx) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, CONSTANTS.BIRD_WIDTH, CONSTANTS.BIRD_HEIGHT);
  }

  move() {
    this.y += this.velocity;
    this.velocity += CONSTANTS.GRAVITY;
    if (this.velocity > CONSTANTS.TERMINAL_VEL) {
      this.velocity = CONSTANTS.TERMINAL_VEL;
    }
  }

  flap() {
    this.velocity = CONSTANTS.FLAP_SPEED;
  }

  getBounds() {
    return [
      [this.x, this.y], 
      [this.x + CONSTANTS.BIRD_WIDTH, this.y + CONSTANTS.BIRD_HEIGHT]
    ];
  }
}