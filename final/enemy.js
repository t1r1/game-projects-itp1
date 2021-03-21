function createEnemy(x, y, isMoving) {
  const enemySize = 50;
  const movingDistance = random(40, 70);
  return {
    x,
    y,
    isMoving,
    isKilled: false,
    speed: 1,
    state: "right",
    maxX: x + movingDistance,
    minX: x,
    count: 0,
    draw: function () {
      this.count += 0.1;
      const enemyY = this.y + 5 * sin(this.count);
      fill([247, 239, 231]);
      ellipse(this.x, enemyY, enemySize, enemySize);
      rect(this.x - 25, enemyY + 3, enemySize, 20);

      stroke("black"); // Change the color
      strokeWeight(7);
      point(this.x - 10, enemyY - 4);
      point(this.x + 10, enemyY - 4);
      noStroke();
    },
    checkContact: function (gc_x, gc_y) {
      let isContact = false;
      if (dist(this.x, this.y, gc_x, gc_y - 30) <= 60) {
        isContact = true;
      }
      return isContact;
    },
    move: function () {
      if (!this.isMoving) {
        return;
      }

      if (this.state === "right") {
        this.x += this.speed;
        if (this.x >= this.maxX) {
          this.state = "left";
        }
      } else {
        this.x -= this.speed;
        if (this.x <= this.minX) {
          this.state = "right";
        }
      }
    },
  };
}
