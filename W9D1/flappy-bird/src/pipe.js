const CONSTANTS = {
  PIPE_WIDTH: (480 / 6),
  PIPE_SPEED: -2,
  PIPE_SPACE: 220,
  PIPE_GAP: 150
};

export default class Pipe {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.x = this.dimensions.width + 40;
    this.starting = this.x;
    this.height = (Math.floor((Math.random() * 10) + 1)) * 45;
  }

  movePipe() {
    this.x += CONSTANTS.PIPE_SPEED;
  }

  drawPipe(ctx) {
    ctx.fillStyle = "green";
    ctx.fillRect(this.x, 0, CONSTANTS.PIPE_WIDTH, this.height);
    ctx.fillRect(this.x, this.height + CONSTANTS.PIPE_GAP, CONSTANTS.PIPE_WIDTH, this.dimensions.height - this.height + CONSTANTS.PIPE_GAP)
  }
  
  getBounds() {
    return {
      top: this.height,
      right: this.x + CONSTANTS.PIPE_WIDTH,
      left: this.x,
      bottom: this.height + CONSTANTS.PIPE_GAP
    };
  }
}