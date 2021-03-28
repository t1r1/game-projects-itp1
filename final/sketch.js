let treePos_y = 0;
let floorPos_x = 0;
let floorPos_y = 0;
let mountains = [];
let gameScore = 0;
let platforms = [];
let clouds = [];
let coins = [];
let enemies = [];
let tooFarLeft = false; // TODO
let character = null;
let lives = null;
let flagpole = {};

// initial game state. other possible variants: 'over', 'play', 'complete'
// the state is used in draw function to switch between different views, when character dies, plays, etc
let gameState = "startscreen";

const stars = [];

let cat;
let liveIcon;
let completeLevelImg;
let gameSound;
let jumpSound;
let fallSound;
let collectableSound;
let gameOverSound;

function preload() {
  // loading pictures
  cat = loadImage("assets/cat_face.png");
  liveIcon = loadImage("assets/heart_full.svg");
  completeLevelImg = loadImage("assets/complete.png");

  //loading sounds, setting volume
  soundFormats("mp3", "wav");
  gameSound = loadSound("assets/sound/dream98.mp3");
  jumpSound = loadSound("assets/sound/jump.mp3");
  fallSound = loadSound("assets/sound/fall.mp3");
  collectableSound = loadSound("assets/sound/coin.mp3");
  gameOverSound = loadSound("assets/sound/24_release.mp3");

  gameSound.setVolume(0.4);
  jumpSound.setVolume(0.1);
  fallSound.setVolume(0.1);
  collectableSound.setVolume(0.1);
  gameOverSound.setVolume(0.3);
}

function playMusic() {
  gameSound.loop();
}

function stopMusic() {
  gameSound.stop();
}

function setupClouds() {
  const numClouds = 10;
  clouds = [];
  for (let i = 0; i < numClouds; i++) {
    clouds.push(createCloud());
  }
}

function setupCollectables() {
  for (let i = 0; i < collectablesCoords.length; i++) {
    const coin = collectablesCoords[i];
    coins.push(createCollectable(coin.x_pos, coin.y_pos, coin.size));
  }
}

function setupEnemies() {
  for (let i = 0; i < enemiesCoords.length; i++) {
    const enemy = enemiesCoords[i];
    enemies.push(createEnemy(enemy.x_pos, enemy.y_pos, true));
  }
}

function setupStars() {
  const numStars = 50;
  for (let i = 0; i < numStars; i++) {
    stars.push(createRandomStar(SIZES.canvasWidth, SIZES.canvasHeight));
  }
}

function setup() {
  createCanvas(SIZES.canvasWidth, SIZES.canvasHeight);
  floorPos_y = LOCATIONS.floorPosY;
  lives = NUMBERS.maxLives;
  gameScore = 0;
  setupClouds();
  setupStars();
}

function renderTree(xPos) {
  noStroke();
  fill(255);
  fill(COLORS.treeTrunk);
  rect(xPos, treePos_y, 35, 132);
  stroke(69, 38, 38);

  line(xPos + 35, treePos_y + 64, xPos + 60, treePos_y + 40);
  line(xPos, treePos_y + 90, xPos - 20, treePos_y + 40);

  noStroke();

  fill(COLORS.treeCrown);
  triangle(
    xPos - 30,
    treePos_y + 19,
    xPos + 18,
    treePos_y - 100,
    xPos + 70,
    treePos_y + 19
  );
}

function drawCanyon(t_canyon) {
  fill(COLORS.sky);
  rect(t_canyon.x_pos, floorPos_y, t_canyon.width, t_canyon.depth);
  fill(COLORS.blueWater);
  rect(t_canyon.x_pos, 530, t_canyon.width, t_canyon.depth);
}

function drawTrees() {
  for (let i = 0; i < trees_x.length; i++) {
    renderTree(trees_x[i]);
  }
}

function renderMountain(t_mountain) {
  beginShape();
  fill(108, 132, 144);
  vertex(t_mountain.x_pos, 432);
  vertex(t_mountain.x_pos + 200, t_mountain.y_pos + 50);
  vertex(t_mountain.x_pos + 400, t_mountain.y_pos + 232);
  endShape();

  beginShape();
  fill(90, 69, 60);
  vertex(t_mountain.x_pos, t_mountain.y_pos + 232);
  vertex(t_mountain.x_pos + 100, t_mountain.y_pos + 100);
  vertex(t_mountain.x_pos + 200, t_mountain.y_pos + 232);
  endShape();

  beginShape();
  fill(202, 218, 225);

  vertex(t_mountain.snow_x_pos, t_mountain.snow_y_pos); // snow on the mountain, top point
  vertex(t_mountain.snow_x_pos - 29, t_mountain.snow_y_pos + 35); // snow on the mountain, to the left and bottom
  vertex(t_mountain.snow_x_pos + 50, t_mountain.snow_y_pos + 60); // snow on the mountain, from the left to the right
  vertex(t_mountain.snow_x_pos + 47, t_mountain.snow_y_pos + 43); //snow on the mountain, from the left to the right

  endShape();

  fill(122, 114, 114);
}

function drawMountains() {
  for (let m = 0; m < mountainsCoords.length; m++) {
    renderMountain(mountainsCoords[m]);
  }
}

function drawClouds() {
  for (let i = 0; i < clouds.length; i++) {
    clouds[i].draw();
  }
}

function drawCatBubble() {
  // draw a bubble
  fill(COLORS.catBubble);
  ellipse(LOCATIONS.catPosX - 30, LOCATIONS.catPosY - 10, 140, 60);
  triangle(-1, 375, -10, 375, -1, 385);
  // draw a text inside the bubble
  fill(COLORS.black);
  textFont("Helvetica", 12);
  text("You Shall Not Pass", LOCATIONS.catPosX - 30, LOCATIONS.catPosY - 5);
}

function keyPressed() {
  switch (gameState) {
    case "play":
      if (keyCode === keyCodes.KEY_CODE_LEFT) {
        character.walkLeft();
      }
      if (keyCode === keyCodes.KEY_CODE_RIGHT) {
        character.walkRight();
      }
      if (keyCode === keyCodes.KEY_CODE_SPACE) {
        character.jump();
      }
      break;
    case "over":
      if (keyCode === keyCodes.KEY_CODE_SPACE) {
        playMusic();
        startGame();
      }
      break;
    case "startscreen":
      if (keyCode === keyCodes.KEY_CODE_ENTER) {
        playMusic();
        startGame();
      }
      break;
    case "complete":
      if (keyCode === keyCodes.KEY_CODE_ENTER) {
        playMusic();
        startGame();
      }
      break;
    default:
      console.error("default, unknown state", gameState);
  }
}

function keyReleased() {
  if (keyCode === keyCodes.KEY_CODE_LEFT) {
    character.front();
  }
  if (keyCode === keyCodes.KEY_CODE_RIGHT) {
    character.front();
  }
}

function renderFlagPole() {
  push();
  strokeWeight(5);
  stroke(180);
  line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 400);
  noStroke();
  fill(COLORS.flagPoleFlag);

  if (flagpole.isReached) {
    rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
  } else {
    rect(flagpole.x_pos, floorPos_y - 400, 50, 50);
  }

  pop(); // cancel stroke weight at the end
}

function startGame() {
  gameScore = 0;
  gameState = "play";
  gameOverSound.stop();

  treePos_y = 300;
  floorPos_x = 0;
  character = createCharacter(90, floorPos_y); // initialize a character with start x and y coordinates

  flagpole = {
    isReached: false,
    x_pos: LOCATIONS.flagpoleX,
  };

  character.resetDir(); // reset character's direction

  platforms = [];

  for (let p = 0; p < platformsCoords.length; p++) {
    platforms.push(
      createPlatform(
        platformsCoords[p].x_pos,
        platformsCoords[p].y_pos,
        platformsCoords[p].length,
        platformsCoords[p].isMoving
      )
    );
  }

  coins = [];
  enemies = [];
  setupCollectables();
  setupEnemies();
}

function gameOver() {
  noStroke();
  fill(255, 255, 255);

  textStyle(BOLD);
  textSize(60);
  stroke(0, 0, 0);
  text("GAME OVER", SIZES.canvasWidth / 3, SIZES.canvasHeight / 2 - 30);
  textSize(20);
  text("press space to continue", SIZES.canvasWidth / 2, 300);

  stopMusic();
}

function startScreen() {
  background(COLORS.sky);
  image(cat, 400, 250);

  noStroke();
  fill(255, 255, 255);
  textStyle(BOLD);
  textSize(30);

  text("press ENTER to start ", SIZES.canvasWidth / 3, 200);
  textSize(13);
  text("Music & sound by Pavel Vorobyov (Slighly Magic)", 650, 550);
  text("Game design & development by Maria Vorobyeva", 650, 530);
}

function renderMoon() {
  // draw half of the moon's day side
  noStroke();
  fill(COLORS.moon);
  ellipse(650, 100, 70, 70);
  fill(COLORS.sky);
  ellipse(630, 100, 70, 70);
}

function renderGround() {
  noStroke();
  fill(COLORS.ground);
  rect(floorPos_x, floorPos_y, 1024, 144); //draw some green ground
  fill(103, 102, 102);
  rect(floorPos_x, SIZES.canvasHeight - 20, 1024, 30); // draw foundation

  // draw foundation layers repeated
  push();
  stroke(COLORS.foundationColorOne);
  strokeWeight(10);
  for (let i = 0; i < 800; i++) {
    point(floorPos_x + i * 10, SIZES.canvasHeight - 20);
  }
  pop();

  push();
  stroke(COLORS.foundationColorTwo);
  strokeWeight(14);
  for (let i = 0; i < 800; i++) {
    point(floorPos_x + i * 10, SIZES.canvasHeight - 30);
  }
  pop();

  push();
  stroke(40, 131, 84);
  strokeWeight(50);
  for (let i = 0; i < 800; i++) {
    point(floorPos_x + i * 10, SIZES.canvasHeight - 60);
  }
  pop();

  push();
  stroke(41, 124, 81);
  strokeWeight(50);
  for (let i = 0; i < 800; i++) {
    point(floorPos_x + i * 10, SIZES.canvasHeight - 80);
  }
  pop();
}

function draw() {
  if (gameState === "startscreen") {
    startScreen();
    return;
  }

  if (gameState === "complete") {
    noStroke();

    noFill();
    background(COLORS.sky);
    image(completeLevelImg, 180, SIZES.canvasHeight / 3);

    noStroke();
    fill(COLORS.flagPoleFlag);
    textStyle(BOLD);
    textSize(20);

    text("press enter to start again", SIZES.canvasWidth / 3, 500);
    text(`your score is ${gameScore}`, SIZES.canvasWidth / 3, 400);

    lives = NUMBERS.maxLives; // reset lives

    return;
  }

  if (gameState === "over") {
    gameOver();
    lives = NUMBERS.maxLives; // reset lives

    if (!gameOverSound.isPlaying()) {
      gameOverSound.loop();
    }

    return;
  }

  if (gameState === "play") {
    console.log(character.x, character.world_x);
    if (lives < 1) {
      gameState = "over";
      gameScore = 0;
      gameSound.stop();
    }

    background(COLORS.sky); //fill the sky blue

    for (let i = 0; i < stars.length; i++) {
      stars[i].draw();
    }
    renderMoon();
    renderGround();

    if (flagpole.isReached) {
      gameState = "complete";
      stopMusic();
    }

    // prevents character from going too far left with a cute bubble
    tooFarLeft = character.world_x <= LOCATIONS.catPosX - 100;

    character.checkPlatformContact();
    character.checkIsPlummeting();

    push();

    character.updateScrollPos();
    character.updateWorldX();

    drawMountains();
    drawClouds();
    drawTrees();

    if (tooFarLeft) {
      drawCatBubble();
    }

    for (let i = 0; i < platforms.length; i++) {
      platforms[i].draw();
      platforms[i].move();
    }

    for (let i = 0; i < coins.length; i++) {
      if (!coins[i].isFound) {
        coins[i].draw();
        coins[i].checkContact();
      }
    }

    for (let i = 0; i < enemies.length; i++) {
      enemies[i].draw();
      enemies[i].move();
      enemies[i].checkContact(character.world_x, character.y);
    }

    //draw canyons
    for (let i = 0; i < canyons.length; i++) {
      drawCanyon(canyons[i]);
    }

    // constantly checking:
    // whether a player fell down inside a canyon,
    character.checkInsideCanyons();
    // whether a player is still alive (not in canyon or not in contact with enemy)
    character.checkPlayerDie();
    // whether the flagpole is reached to draw it in a proper state.
    if (!flagpole.isReached) {
      character.checkFlagPole();
    }
    // render the black cat
    image(cat, LOCATIONS.catPosX, LOCATIONS.catPosY);

    renderFlagPole();

    pop();

    // draw lives icons
    for (let i = 0; i < lives; i++) {
      image(liveIcon, 28 + i * 25, 30, 20, 20);
    }

    // draw game score
    fill(255);
    noStroke();
    textSize(15);
    text("score " + gameScore, 30, 20);

    character.draw();

    // DEBUG
    fill("Salmon");
    textSize(16);
    textAlign(CENTER);
    text(
      "(" + floor(mouseX - character.scrollPos) + ", " + floor(mouseY) + ")",
      mouseX,
      mouseY
    );

    //DEBUG
  }
}
