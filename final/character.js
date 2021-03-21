function createCharacter(x, y) {
  return {
    x,
    y,
    direction: "front",
    isFalling: false,
    isPlummeting: false,
    isInsideCanyon: false,
    scrollPos: 0,
    world_x: this.x - this.scrollPos,
    updateWorldX: function () {
      this.world_x = this.x - this.scrollPos;
    },
    updateScrollPos: function () {
      translate(this.scrollPos, 0);
    },
    stop: function () {
      this.x = 0;
    },
    move: function () {
      if (this.isFalling) {
        this.y += 3;
        if (!this.isPlummeting && this.y > floorPos_y) {
          this.y = floorPos_y;
          this.isFalling = false;
        }
      }

      if (this.direction === "right") {
        if (this.x < width * 0.8) {
          this.x += 5;
        } else {
          this.scrollPos -= 5;
        }
      }

      if (this.direction === "left") {
        const tooFarLeft = character.world_x <= SIZES.catPosX - 200; //
        if (!tooFarLeft) {
          if (this.x > width * 0.2) {
            this.x -= 5;
          } else {
            this.scrollPos += 5;
          }
        }
      }

      if (this.isPlummeting) {
        this.y += 5;
      }
    },
    draw: function () {
      this.move();

      switch (this.direction) {
        case "left":
          if (this.isFalling || this.isPlummeting) {
            this.drawFallLeft();
          } else {
            this.drawLeft();
          }
          break;
        case "front":
          if (this.isFalling || this.isPlummeting) {
            this.drawFallFront();
          } else {
            this.drawFront();
          }
          break;
        case "right":
          if (this.isFalling || this.isPlummeting) {
            this.drawFallRight();
          } else {
            this.drawRight();
          }

          break;
        default:
          console.error("unknown direction - ", this.direction);
      }
    },
    checkInsideCanyons: function () {
      // detect whether character is inside a canyon
      for (let i = 0; i < canyons.length; i++) {
        const offset = SIZES.characterBody / 2;
        const rightEdge = canyons[i].x_pos + canyons[i].width - offset;
        const leftEdge = canyons[i].x_pos + offset;

        if (
          this.world_x < rightEdge &&
          this.world_x > leftEdge &&
          this.y === floorPos_y
        ) {
          this.isInsideCanyon = true;
          fallSound.play();
          break;
        }
      }
    },
    checkIsPlummeting: function () {
      if (this.y >= floorPos_y && this.isInsideCanyon) {
        // inside canyon and falling!
        this.isPlummeting = true;

        this.resetDir();
      } else {
        this.isPlummeting = false;
      }
    },
    checkPlatformContact: function () {
      if (
        (this.y < floorPos_y && !this.isInsideCanyon) ||
        (this.isInsideCanyon && this.y < floorPos_y + 120)
      ) {
        let isContact = false;

        for (let i = 0; i < platforms.length; i++) {
          if (platforms[i].checkContact(this.world_x, this.y)) {
            isContact = true;
            break;
          }
        }

        this.isFalling = !isContact;
      }
    },
    checkPlayerDie: function () {
      let hasContactWithEnemy = false;

      for (let i = 0; i < enemies.length; i++) {
        if (enemies[i].checkContact(this.world_x, this.y)) {
          hasContactWithEnemy = true;
          break;
        }
      }

      if (hasContactWithEnemy) {
        if (!fallSound.isPlaying()) {
          fallSound.play();
        }
      }

      if (this.y > SIZES.canvasHeight || hasContactWithEnemy) {
        lives -= 1;
        if (lives > 0) {
          startGame();
        }
      }
    },
    jump: function () {
      if (!this.isFalling && !this.isPlummeting) {
        jumpSound.play();
        this.y -= SIZES.jumpElevation;
      }
    },
    fall: function () {
      this.isFalling = true;
    },
    walkLeft: function () {
      this.direction = "left";
    },
    walkRight: function () {
      this.direction = "right";
    },
    front: function () {
      this.direction = "front";
    },
    resetDir: function () {
      this.front();
    },
    drawFallLeft: function () {
      strokeWeight(4);
      //head
      stroke(0);

      fill(200, 150, 150);
      ellipse(this.x, this.y - 50, 35);
      ellipse(this.x, this.y - 65, 3);
      ellipse(this.x + 3, this.y - 65, 3);
      ellipse(this.x - 3, this.y - 65, 3);

      // face
      fill(0);
      rect(this.x - 10, this.y - 50, 10, 1);

      // body
      fill(COLORS.character.body);
      stroke(0);
      rect(this.x - 13, this.y - 35, 26, 20);

      //feet
      fill(0);
      rect(this.x - 15, this.y - 5, 10, 15); // left foot
      rect(this.x + 5, this.y - 5, 10, 15); // right foot

      // hands
      fill(COLORS.character.hands);
      rect(this.x - 23, this.y - 40, 10, 10);
      rect(this.x + 13, this.y - 40, 10, 10);
    },
    drawFallRight: function () {
      strokeWeight(4);
      //head
      stroke(0);

      fill(200, 150, 150);
      ellipse(this.x, this.y - 50, 35);
      ellipse(this.x, this.y - 65, 3);
      ellipse(this.x + 3, this.y - 65, 3);
      ellipse(this.x - 3, this.y - 65, 3);

      // face
      fill(0);
      rect(this.x, this.y - 50, 10, 1);

      // body
      fill(COLORS.character.body);
      stroke(0);
      rect(this.x - 13, this.y - 35, 26, 20);

      //feet
      fill(0);
      rect(this.x - 15, this.y - 13, 10, 13); // left foot
      rect(this.x + 5, this.y - 10, 8, 10); // right foot

      // hands
      fill(COLORS.character.hands);
      rect(this.x - 23, this.y - 40, 10, 10);
      rect(this.x + 13, this.y - 40, 10, 10);
    },
    drawFallFront: function () {
      strokeWeight(4);
      //head
      stroke(0);

      fill(200, 150, 150);
      ellipse(this.x, this.y - 50, 35);
      ellipse(this.x, this.y - 65, 3);
      ellipse(this.x + 3, this.y - 65, 3);
      ellipse(this.x - 3, this.y - 65, 3);

      // face
      fill(0);
      rect(this.x - 5, this.y - 50, 10, 1);

      // body
      fill(COLORS.character.body);
      stroke(0);
      rect(this.x - 13, this.y - 35, 26, 20);

      //feet
      fill(0);
      rect(this.x - 15, this.y - 5, 10, 15); // left foot
      rect(this.x + 5, this.y - 5, 10, 15); // right foot

      // hands
      fill(COLORS.character.hands);
      rect(this.x - 23, this.y - 40, 10, 10);
      rect(this.x + 13, this.y - 40, 10, 10);
    },
    drawFront: function () {
      strokeWeight(4);
      //head
      stroke(0);

      fill(200, 150, 150);
      ellipse(this.x, this.y - 50, SIZES.characterBody);
      ellipse(this.x, this.y - 65, 3);
      ellipse(this.x + 3, this.y - 65, 3);
      ellipse(this.x - 3, this.y - 65, 3);

      // face
      fill(0);
      rect(this.x - 5, this.y - 50, 10, 1);

      // body
      fill(COLORS.character.body);
      stroke(0);
      rect(this.x - 13, this.y - SIZES.characterBody, 26, 30);

      //feet
      fill(0);
      rect(this.x - 15, this.y - 5, 10, 10); // left foot
      rect(this.x + 5, this.y - 5, 10, 10); // right foot

      // hands
      fill(200, 150, 150);
      rect(this.x - 23, this.y - 33, 10, 10);
      rect(this.x + 13, this.y - 33, 10, 10);
    },

    drawRight: function () {
      strokeWeight(4);
      //head
      stroke(0);

      fill(200, 150, 150);
      ellipse(this.x, this.y - 50, 35);
      ellipse(this.x, this.y - 65, 3);
      ellipse(this.x + 3, this.y - 65, 3);
      ellipse(this.x - 3, this.y - 65, 3);

      // face
      fill(0);
      rect(this.x, this.y - 50, 10, 1);

      // body
      fill(COLORS.character.body);
      stroke(0);
      rect(this.x - 13, this.y - 35, 26, 30);

      //feet
      fill(0);
      rect(this.x - 15, this.y - 5, 10, 10); // left foot
      rect(this.x + 5, this.y - 10, 10, 10); // right foot

      // hands
      fill(COLORS.character.hands);
      rect(this.x - 23, this.y - 31, 10, 10);
      rect(this.x + 13, this.y - 34, 10, 10);
    },
    drawLeft: function () {
      strokeWeight(4);
      //head
      stroke(0);

      fill(200, 150, 150);
      ellipse(this.x, this.y - 50, 35);
      ellipse(this.x, this.y - 65, 3);
      ellipse(this.x + 3, this.y - 65, 3);
      ellipse(this.x - 3, this.y - 65, 3);

      // face
      fill(0);
      rect(this.x - 10, this.y - 50, 10, 1);

      // body
      fill(COLORS.character.body);
      stroke(0);
      rect(this.x - 13, this.y - 35, 26, 30);

      //feet
      fill(0);
      rect(this.x - 15, this.y - 10, 10, 10);
      rect(this.x + 5, this.y - 5, 10, 10);

      // hands
      fill(COLORS.character.hands);
      rect(this.x - 23, this.y - 34, 10, 10);
      rect(this.x + 13, this.y - 31, 10, 10);
    },
    checkFlagPole: function () {
      const distance = abs(this.world_x - flagpole.x_pos);

      if (distance <= 15) {
        flagpole.isReached = true;
      }
    },
  };
}
