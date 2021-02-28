function createCloud() {
  const size = random(0.8, 1.5);
  const maxX = 2800;
  return {
    x: random(-10, 2600),
    y: random(50, 150),
    width: 70 * size,
    height: 50 * size,
    speed: random(0.1, 0.5),
    draw() {
      noStroke();
      fill(COLORS.cloud);
      // the shadow
      ellipse(
        this.x,
        this.y - 3 * size,
        this.width * 2,
        this.height + 20 * size
      );
      ellipse(
        this.x - 50 * size,
        this.y,
        this.width - 5 * size,
        this.height - 10 * size
      );
      ellipse(this.x + 50 * size, this.y, this.width, this.height);

      // a cloud
      fill(255);
      ellipse(this.x, this.y, this.width + 50 * size, this.height + 26 * size);
      ellipse(
        this.x - 50 * size,
        this.y,
        this.width - 10 * size,
        this.height - 15 * size
      );
      ellipse(this.x + 50 * size, this.y, this.width, this.height);

      this.x += this.speed;
      if (this.x > maxX) {
        this.x = -800;
      }
    },
  };
}
