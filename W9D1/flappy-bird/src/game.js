import Level from './level';
import Bird from './bird';
import Pipe from './pipe';

export default class FlappyBird {
  constructor(canvas){
    this.ctx = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
  }

  animate() {
    this.level.drawBackground(this.ctx);
    this.bird.move();
    this.bird.drawBird(this.ctx);
    
    for (let i = 0; i < this.pipes.length; i++) {
      let pipe = this.pipes[i];
      pipe.drawPipe(this.ctx);
      pipe.movePipe();
      if (pipe.x === pipe.starting - 220) {
        let newPipe = new Pipe(this.dimensions);
        this.pipes.push(newPipe);
      }
      //incrementing score
      if (pipe.getBounds().right === this.bird.x) {
        this.score += 1;
      }
      if (pipe.x < -150) {
        this.pipes.shift();
      }
    }
    this.collidesWith();
    if (this.running) {
      requestAnimationFrame(this.animate.bind(this));
    }
    this.drawScore(this.ctx);
  }

  restart() {
    this.level = new Level(this.dimensions);
    this.bird = new Bird(this.dimensions);
    this.score = 0;
    let pipe = new Pipe(this.dimensions);
    this.pipes = [];
    this.pipes.push(pipe);

    this.running = false;
    this.animate();
  }

  play() {
    this.running = true;
    this.animate();
  }

  click() {
    if (!this.running) {
      this.play();
    }

    this.bird.flap();
  }

  collidesWith() {
    let birdBounds = this.bird.getBounds();
    let birdTopLeft = birdBounds[0];
    let birdBottomRight = birdBounds[1];
    let birdTop = birdTopLeft[1];
    let birdBottom = birdBottomRight[1];
    let birdLeft = birdTopLeft[0];
    let birdRight = birdBottomRight[0];
    for (let i = 0; i < this.pipes.length; i++) {
      let pipe = this.pipes[i];
      let pipeBounds = pipe.getBounds();
      if ((birdTop <= pipeBounds.top || 
        birdBottom >= pipeBounds.bottom) && 
        (birdRight >= pipeBounds.left && 
          birdLeft <= pipeBounds.right)) {
            alert("Flappy Bird Died");
            this.restart();
      }
    }
  }
  drawScore(ctx) {
    ctx.fillStyle = "white";
    // ctx.fillRect(0,0, 50, 50);
    ctx.font = "30px Arial";
    ctx.fillText(`${this.score}`, (this.dimensions.width / 2), 50);
  }
}
