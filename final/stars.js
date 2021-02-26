// constructor function that creates random positioned stars with a random speed of flickering

function createRandomStar(canvasWidth, canvasHeight) {
  let color = [
    floor(random(128, 255)),
    floor(random(128, 255)),
    floor(random(128, 255)),
  ].join(", ");
  color = "rgb(" + color + ")";

  return {
    x: random(canvasWidth),
    y: random(canvasHeight),
    size: random(3, 7),
    color,
    state: "grow",
    multiplier: random(0, 1),
    speed: random(0.01, 0.06),
    draw() {
      if (this.state == "grow") {
        this.multiplier += this.speed;
        if (this.multiplier >= 1) {
          this.state = "shrink";
        }
      } else {
        this.multiplier -= this.speed;
        if (this.multiplier <= 0) {
          this.x = random(canvasWidth);
          this.y = random(canvasHeight);
          this.state = "grow";
        }
      }

      let vectors = [
        createVector(1, 0),
        createVector(0, -1),
        createVector(-1, 0),
        createVector(0, 1),
        createVector(1, 1),
        createVector(1, -1),
        createVector(-1, -1),
        createVector(-1, 1),
      ];

      for (let i = 0; i < 4; i++) {
        vectors[i].normalize();
        vectors[i].mult(this.size * this.multiplier);
      }

      for (let i = 4; i < 8; i++) {
        vectors[i].normalize();
        vectors[i].mult((this.size * this.multiplier) / 1.5);
      }
      stroke(this.color);
      strokeWeight(1);
      for (let i = 0; i < vectors.length; i++) {
        const v = vectors[i];
        line(this.x, this.y, this.x + v.x, this.y + v.y);
      }
    },
  };
}
