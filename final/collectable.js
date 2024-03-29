function createCollectable(x_pos, y_pos, size) {
  return {
    x: x_pos,
    y: y_pos,
    size,
    isFound: false,
    checkContact: function () {
      if (dist(this.x, this.y, character.world_x, character.y - 30) <= 60) {
        this.isFound = true;
        collectableSound.play();
        gameScore += 1;
      }
    },
    draw: function () {
      fill(COLORS.collectable.outer);
      ellipse(this.x - 5, this.y, this.size - 10, this.size); // coin edge

      fill(COLORS.collectable.inner);
      ellipse(this.x, this.y, this.size - 10, this.size);

      textAlign(CENTER);
      textSize(30);
      textFont("Georgia");

      fill(186, 144, 14); // text ($) shadow
      text("$", this.x, this.y + 10);
      fill(250, 237, 54);
      text("$", this.x - 2, this.y + 10);
    },
  };
}
