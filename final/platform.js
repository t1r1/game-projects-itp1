function createPlatform(x, y, length, isMoving) {
  return {
    x,
    y,
    length,
    isMoving,
    speed: 1,
    state: "right",
    maxX: x + length,
    minX: x,
    draw: function () {
      fill(COLORS.platform);
      rect(this.x, this.y, this.length, SIZES.platform);
      fill([140, 131, 148]);
      rect(this.x, this.y + SIZES.platform, this.length, 5);
      fill([153, 153, 122]);
      rect(this.x, this.y + 5, this.length, 2);
    },
    checkContact: function (gc_x, gc_y) {
      const offset = SIZES.characterBody / 2;
      const leftEdge = this.x - offset;
      const rightEdge = this.x + this.length + offset;

      if (gc_x > leftEdge && gc_x < rightEdge) {
        const distance = this.y - gc_y;
        return distance > 0 && distance < 5; // is above the platform, but not very much (5)
      }
      return false;
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
