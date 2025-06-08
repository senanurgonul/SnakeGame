class Flame {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.alpha = 255;
  }

  update() {
    this.alpha -= 5;
  }

  show() {
  noStroke(); 
  fill(255, 0, 0, this.alpha);
  rect(this.x, this.y, scl, scl);
}
  
  shouldRemove() {
  return this.alpha <= 0;
}
}