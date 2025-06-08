class Snake {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = 1;
    this.ySpeed = 0;
    this.total = 0;
    this.tail = [];
    this.deathPosition = createVector(0, 0);
  }

  dir(x, y) {
    this.xSpeed = x;
    this.ySpeed = y;
  }

  update() {
    if (!gameOver) {
      if (this.total === this.tail.length) {
        for (let i = 0; i < this.tail.length - 1; i++) {
          this.tail[i] = this.tail[i + 1];
        }
      }
      this.tail[this.total - 1] = createVector(this.x, this.y);
      this.x += this.xSpeed * scl;
      this.y += this.ySpeed * scl;

      this.x = constrain(this.x, 0, width - scl);
      this.y = constrain(this.y, 0, height - scl);

     
      for (let i = 0; i < holes.length; i++) {
        let hole = holes[i];
        if (this.x === hole.x && this.y === hole.y) {
          gameOver = true;
          this.deathPosition = createVector(this.x, this.y);
          loseSound.play();
          break;
        }
      }
    }
  }

  death() {
    for (let i = 0; i < this.tail.length; i++) {
      let pos = this.tail[i];
      let d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        gameOver = true;
        this.deathPosition = createVector(this.x, this.y);
        loseSound.play();
        break;
      }
    }
  }

  eat(pos) {
    let d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      eatSound.play();
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  eatGoldFood(pos) {
    if (!pos) {
      return false;
    }
    let d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      eatSound.play();
      flames.push(new Flame(pos.x, pos.y));
      return true;
    } else {
    
      return false;
    }
  }

  show() {
  fill(255);
  stroke(0); 
  for (let i = 0; i < this.tail.length; i++) {
    rect(this.tail[i].x, this.tail[i].y, scl, scl);
  }
  rect(this.x, this.y, scl, scl);
}
}