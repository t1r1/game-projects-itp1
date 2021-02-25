var gameChar_x = 0;
var gameChar_y = 0;
var gameChar_world_x = 0;
var treePos_x = 0;
var treePos_y = 0;
var floorPos_x = 0;
var floorPos_y = 0;
var canyon = {};
var collectable = {};
var cloud = {};
var mountains = {};
var insideCanyon = false;
var gameScore = 0;
var platforms = [];
var tooFarLeft = false;

var lives = null;
var gameState = "startscreen"; // initial state

var isLeft = false;
var isRight = false;
var isFalling = false;
var isPlummeting = false;
var isJumping = false;
var flagpole = {};

const keyCodes = {
  KEY_CODE_LEFT: 37,
  KEY_CODE_RIGHT: 39,
  KEY_CODE_SPACE: 32,
  KEY_CODE_ENTER: 13,
};
var scrollPos;

const COLORS = {
  treeCrown: [63, 90, 56],
  treeTrunk: [67, 58, 34],
  // sky: [98, 180, 229],
  sky: [51, 56, 99],
  cloud: [78, 191, 239],
  ground: [117, 166, 91],
  blueWater: [4, 117, 185],
  flagPoleFlag: [241, 55, 82],
  foundationColorOne: [96, 107, 53],
  foundationColorTwo: [68, 93, 58],
  character: {
    body: [228, 105, 74],
    hands: [200, 150, 150],
    hair: [219, 218, 158],
  },
  startScreen: [0, 0, 0],
  startScreentext: [0, 0, 0],
  platform: [200, 145, 92],
  moon: [230, 230, 180],
};

const SIZES = {
  canvasWidth: 1024,
  canvasHeight: 576,
  characterBody: 35,
  platform: 10,
  jumpElevation: 150,
  catPosX: -10,
  catPosY: 360,
};

var trees_x = [-300, 40, 600, 800, 1370, 2000, 2400, 2700, 3000, 3400];
var clouds = [];

const cloudSpeed = [];
var collectables = [
  { x_pos: 200, isFound: false, y_pos: 280, size: 50 },
  { x_pos: 460, isFound: false, y_pos: 280, size: 50 },
  { x_pos: 1250, isFound: false, y_pos: 250, size: 50 },
  { x_pos: 1050, isFound: false, y_pos: 290, size: 50 },
];
var mountains_x = [300, 1500];
var mountains_x_snow = [500, 1700];
var canyons = [
  {
    x_pos: 120,
    width: 120,
    depth: 120,
    isCharacterInside: false,
  },
  { x_pos: 1000, width: 120, depth: 120, isCharacterInside: false },
];

var NUMBERS = {
  maxLives: 3,
  minLives: 1,
  maxScore: collectables.length,
};

let stars = [];

let cat;
let liveIcon;
let gameOverImg;
let completeLevelImg;
let gameSound;

function preload() {
  // loading pictures
  cat = loadImage("assets/cat_face.png");
  liveIcon = loadImage("assets/heart_full.svg");
  gameOverImg = loadImage("assets/gameover.png");
  completeLevelImg = loadImage("assets/complete.png");

  //loading sounds
  soundFormats("mp3", "wav");
  gameSound = loadSound("assets/dream98.mp3");
  gameSound.setVolume(0.3);
}

function playMusic() {
  // gameSound.loop();
}

function setupClouds() {
  const numClouds = 5;
  for (let i = 0; i < numClouds; i++) {
    const xCord = random(10, 1000);
    const speed = random(0.1, 1);
    clouds.push(xCord);
    cloudSpeed.push(speed);
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
  floorPos_y = 432;
  lives = NUMBERS.maxLives;
  setupClouds();
  setupStars();
}

function renderCharacterFront() {
  strokeWeight(4);
  //head
  stroke(0);

  fill(200, 150, 150);
  ellipse(gameChar_x, gameChar_y - 50, SIZES.characterBody);
  ellipse(gameChar_x, gameChar_y - 65, 3);
  ellipse(gameChar_x + 3, gameChar_y - 65, 3);
  ellipse(gameChar_x - 3, gameChar_y - 65, 3);

  // face
  fill(0);
  rect(gameChar_x - 5, gameChar_y - 50, 10, 1);

  // body
  fill(255, 203, 0);
  stroke(0);
  rect(gameChar_x - 13, gameChar_y - SIZES.characterBody, 26, 30);

  //feet
  fill(0);
  rect(gameChar_x - 15, gameChar_y - 5, 10, 10); // left foot
  rect(gameChar_x + 5, gameChar_y - 5, 10, 10); // right foot

  // hands
  fill(200, 150, 150);
  rect(gameChar_x - 23, gameChar_y - 33, 10, 10);
  rect(gameChar_x + 13, gameChar_y - 33, 10, 10);
}

function renderCharacterJump() {
  strokeWeight(4);
  //head
  stroke(0);

  fill(200, 150, 150);
  ellipse(gameChar_x, gameChar_y - 50, 35);
  ellipse(gameChar_x, gameChar_y - 65, 3);
  ellipse(gameChar_x + 3, gameChar_y - 65, 3);
  ellipse(gameChar_x - 3, gameChar_y - 65, 3);

  // face
  fill(0);
  rect(gameChar_x - 5, gameChar_y - 50, 10, 1);

  // body
  fill(COLORS.character.body);
  stroke(0);
  rect(gameChar_x - 13, gameChar_y - 35, 26, 20);

  //feet
  fill(0);
  rect(gameChar_x - 15, gameChar_y - 5, 10, 15); // left foot
  rect(gameChar_x + 5, gameChar_y - 5, 10, 15); // right foot

  // hands
  fill(COLORS.character.hands);
  rect(gameChar_x - 23, gameChar_y - 40, 10, 10);
  rect(gameChar_x + 13, gameChar_y - 40, 10, 10);
}

function renderCharacterJumpRight() {
  strokeWeight(4);
  //head
  stroke(0);

  fill(200, 150, 150);
  ellipse(gameChar_x, gameChar_y - 50, 35);
  ellipse(gameChar_x, gameChar_y - 65, 3);
  ellipse(gameChar_x + 3, gameChar_y - 65, 3);
  ellipse(gameChar_x - 3, gameChar_y - 65, 3);

  // face
  fill(0);
  rect(gameChar_x, gameChar_y - 50, 10, 1);

  // body
  fill(COLORS.character.body);
  stroke(0);
  rect(gameChar_x - 13, gameChar_y - 35, 26, 20);

  //feet
  fill(0);
  rect(gameChar_x - 15, gameChar_y - 13, 10, 13); // left foot
  rect(gameChar_x + 5, gameChar_y - 10, 8, 10); // right foot

  // hands
  fill(COLORS.character.hands);
  rect(gameChar_x - 23, gameChar_y - 40, 10, 10);
  rect(gameChar_x + 13, gameChar_y - 40, 10, 10);
}

function renderCharacterJumpLeft() {
  strokeWeight(4);
  //head
  stroke(0);

  fill(200, 150, 150);
  ellipse(gameChar_x, gameChar_y - 50, 35);
  ellipse(gameChar_x, gameChar_y - 65, 3);
  ellipse(gameChar_x + 3, gameChar_y - 65, 3);
  ellipse(gameChar_x - 3, gameChar_y - 65, 3);

  // face
  fill(0);
  rect(gameChar_x - 10, gameChar_y - 50, 10, 1);

  // body
  fill(COLORS.character.body);
  stroke(0);
  rect(gameChar_x - 13, gameChar_y - 35, 26, 20);

  //feet
  fill(0);
  rect(gameChar_x - 15, gameChar_y - 5, 10, 15); // left foot
  rect(gameChar_x + 5, gameChar_y - 5, 10, 15); // right foot

  // hands
  fill(COLORS.character.hands);
  rect(gameChar_x - 23, gameChar_y - 40, 10, 10);
  rect(gameChar_x + 13, gameChar_y - 40, 10, 10);
}

function renderCharacterWalkRight() {
  strokeWeight(4);
  //head
  stroke(0);

  fill(200, 150, 150);
  ellipse(gameChar_x, gameChar_y - 50, 35);
  ellipse(gameChar_x, gameChar_y - 65, 3);
  ellipse(gameChar_x + 3, gameChar_y - 65, 3);
  ellipse(gameChar_x - 3, gameChar_y - 65, 3);

  // face
  fill(0);
  rect(gameChar_x, gameChar_y - 50, 10, 1);

  // body
  fill(COLORS.character.body);
  stroke(0);
  rect(gameChar_x - 13, gameChar_y - 35, 26, 30);

  //feet
  fill(0);
  rect(gameChar_x - 15, gameChar_y - 5, 10, 10); // left foot
  rect(gameChar_x + 5, gameChar_y - 10, 10, 10); // right foot

  // hands
  fill(COLORS.character.hands);
  rect(gameChar_x - 23, gameChar_y - 31, 10, 10);
  rect(gameChar_x + 13, gameChar_y - 34, 10, 10);
}

function renderCharacterWalkLeft() {
  strokeWeight(4);
  //head
  stroke(0);

  fill(200, 150, 150);
  ellipse(gameChar_x, gameChar_y - 50, 35);
  ellipse(gameChar_x, gameChar_y - 65, 3);
  ellipse(gameChar_x + 3, gameChar_y - 65, 3);
  ellipse(gameChar_x - 3, gameChar_y - 65, 3);

  // face
  fill(0);
  rect(gameChar_x - 10, gameChar_y - 50, 10, 1);

  // body
  fill(COLORS.character.body);
  stroke(0);
  rect(gameChar_x - 13, gameChar_y - 35, 26, 30);

  //feet
  fill(0);
  rect(gameChar_x - 15, gameChar_y - 10, 10, 10);
  rect(gameChar_x + 5, gameChar_y - 5, 10, 10);

  // hands
  fill(COLORS.character.hands);
  rect(gameChar_x - 23, gameChar_y - 34, 10, 10);
  rect(gameChar_x + 13, gameChar_y - 31, 10, 10);
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

function renderCloud(xPos) {
  noStroke();
  fill(COLORS.cloud);

  // a cloud
  ellipse(xPos, cloud.y_pos - 3, cloud.width * 2, cloud.height + 20);
  ellipse(xPos - 50, cloud.y_pos, cloud.width - 5, cloud.height - 10);
  ellipse(xPos + 50, cloud.y_pos, cloud.width, cloud.height);

  // the shadow
  fill(255);
  ellipse(xPos, cloud.y_pos, cloud.width + 50, cloud.height + 26);
  ellipse(xPos - 50, cloud.y_pos, cloud.width - 10, cloud.height - 15);
  ellipse(xPos + 50, cloud.y_pos, cloud.width, cloud.height);
}

function drawCanyon(t_canyon) {
  fill(COLORS.sky);
  rect(t_canyon.x_pos, floorPos_y, t_canyon.width, t_canyon.width + 30);
  fill(COLORS.blueWater);
  rect(t_canyon.x_pos, 530, 120, 130);
}

function drawCollectable(t_collectable) {
  fill(226, 184, 54);
  ellipse(
    t_collectable.x_pos - 5,
    t_collectable.y_pos,
    t_collectable.size - 10,
    t_collectable.size
  ); // coin edge

  fill(250, 237, 54);
  ellipse(
    t_collectable.x_pos,
    t_collectable.y_pos,
    t_collectable.size - 10,
    t_collectable.size
  );
  textSize(30);

  textFont("Georgia");

  fill(186, 144, 14); // text shadow
  text("$", t_collectable.x_pos - 8, t_collectable.y_pos + 10);
  fill(250, 237, 54);
  text("$", t_collectable.x_pos - 10, t_collectable.y_pos + 10);
}

function drawTrees() {
  for (let i = 0; i < trees_x.length; i++) {
    renderTree(trees_x[i]);
  }
}

function renderMountain(xPos, snowXPos) {
  beginShape();
  fill(108, 132, 144);
  vertex(xPos, 432);
  vertex(xPos + 200, mountains.mountain_y_pos + 50);
  vertex(xPos + 400, mountains.mountain_y_pos + 232);
  endShape();

  beginShape();
  fill(90, 69, 60);
  vertex(xPos, mountains.mountain_y_pos + 232);
  vertex(xPos + 100, mountains.mountain_y_pos + 100);
  vertex(xPos + 200, mountains.mountain_y_pos + 232);
  endShape();

  beginShape();
  fill(202, 218, 225);

  vertex(snowXPos, mountains.snow_y_pos); // snow on the mountain, top point
  vertex(snowXPos - 29, mountains.snow_y_pos + 35); // snow on the mountain, to the left and bottom
  vertex(snowXPos + 50, mountains.snow_y_pos + 60); // snow on the mountain, from the left to the right
  vertex(snowXPos + 47, mountains.snow_y_pos + 43); //snow on the mountain, from the left to the right

  endShape();

  fill(122, 114, 114);
}

function drawMountains() {
  for (let m = 0; m < mountains_x.length; m++) {
    renderMountain(mountains_x[m], mountains_x_snow[m]);
  }
}

function drawClouds(clouds) {
  for (let i = 0; i < clouds.length; i++) {
    clouds[i] += cloudSpeed[i];
    renderCloud(clouds[i]);
  }
}

function keyPressed() {
  switch (gameState) {
    case "play":
      if (keyCode === keyCodes.KEY_CODE_LEFT) {
        isLeft = true;
      }
      if (keyCode === keyCodes.KEY_CODE_RIGHT) {
        isRight = true;
      }
      if (keyCode === keyCodes.KEY_CODE_SPACE && !isFalling && !isPlummeting) {
        isJumping = true;
      }
      break;
    case "over":
      console.log("inside over");
      if (keyCode === keyCodes.KEY_CODE_SPACE) {
        console.log("inside space over");
        startGame();
      }
      break;
    case "startscreen":
      if (keyCode === keyCodes.KEY_CODE_ENTER) {
        startGame();
      }
      break;
    case "complete":
      if (keyCode === keyCodes.KEY_CODE_ENTER) {
        startGame();
      }
      break;
    default:
      console.error("default, unknown state", gameState);
  }
}

function keyReleased() {
  if (keyCode === keyCodes.KEY_CODE_LEFT) {
    isLeft = false;
  }
  if (keyCode === keyCodes.KEY_CODE_RIGHT) {
    isRight = false;
  }
  if (keyCode === keyCodes.KEY_CODE_SPACE) {
    isPlummeting = false;
  }
}

function checkCollectables() {
  var gameChar_world_x = gameChar_x - scrollPos; // define a real game character coordinate
  for (let i = 0; i < collectables.length; i++) {
    if (
      dist(
        collectables[i].x_pos,
        collectables[i].y_pos,
        gameChar_world_x,
        gameChar_y
      ) <= 50
    ) {
      if (collectables[i].isFound) {
        continue;
      }
      collectables[i].isFound = true;
      gameScore += 1;
      break;
    }
  }
}

function checkPlayerDie() {
  if (gameChar_y > SIZES.canvasHeight) {
    console.log("is dead");
    lives -= 1;
    gameSound.stop();
    if (lives > 0) {
      startGame();
    }
  }
}

function checkCanyons() {
  // detect whether character is inside the canyon
  var gameChar_world_x = gameChar_x - scrollPos; // define a real game character coordinate
  for (let i = 0; i < canyons.length; i++) {
    const offset = SIZES.characterBody / 2;
    const rightEdge = canyons[i].x_pos + canyons[i].width - offset;
    const leftEdge = canyons[i].x_pos + offset;

    if (
      gameChar_world_x < rightEdge &&
      gameChar_world_x > leftEdge &&
      gameChar_y === floorPos_y
    ) {
      insideCanyon = true;
      break;
    }
  }
}

function renderFlagPole() {
  push();
  strokeWeight(5);
  stroke(180);
  line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
  noStroke();
  fill(COLORS.flagPoleFlag);

  if (flagpole.isReached) {
    rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
  } else {
    rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
  }

  pop(); // cancel stroke weight at the end
}

function checkFlagPole() {
  var gameChar_world_x = gameChar_x - scrollPos;
  var distance = abs(gameChar_world_x - flagpole.x_pos);

  if (distance <= 15) {
    flagpole.isReached = true;
  }
}

function startGame() {
  gameState = "play";
  console.log("gameStart, with state ", gameState);
  playMusic();

  treePos_y = 300;
  gameChar_x = 800;
  gameChar_y = floorPos_y;
  floorPos_x = 0;

  cloud = {
    y_pos: 100,
    width: 70,
    height: 50,
  };

  mountains = {
    snow_x_pos: 500,
    snow_y_pos: 250,
    mountain_x_pos: 300,
    mountain_y_pos: 200,
  };

  scrollPos = 0;
  //    gameScore = 0;

  flagpole = {
    isReached: false,
    x_pos: 2600,
  };

  // drop all the flags
  isLeft = false;
  isRight = false;
  isFalling = false;
  isPlummeting = false;
  isJumping = false;
  insideCanyon = false;

  platforms.push(createPlatform(150, floorPos_y - 100, 130));
  platforms.push(createPlatform(1000, floorPos_y - 105, 110));
  platforms.push(createPlatform(1200, floorPos_y - 140, 100, true));
  platforms.push(createPlatform(1100, floorPos_y - 200, 80));
}

function gameOver() {
  noStroke();
  fill(COLORS.flagPoleFlag);
  textStyle(BOLD);
  textSize(20);
  image(gameOverImg, 180, SIZES.canvasHeight / 3);

  text("press space to continue", SIZES.canvasWidth / 3, 400);
}

function startScreen() {
  background(COLORS.sky);
  image(cat, 400, 250);

  noStroke();
  fill(255, 255, 255);
  textStyle(BOLD);
  textSize(20);

  text("press ENTER to start the game", SIZES.canvasWidth / 3, 200);
  textSize(13);
  text("Music & sound by Pavel Vorobyov (Slighly Magic)", 650, 550);
  text("Game design & development by Maria Vorobyeva", 650, 530);
}

function renderStars() {
  for (let i = 0; i < 5; i++) {
    const x = random(0, 1000);
    const y = random(0, 1000);
    stroke(210, 224, 233); // Change the color
    strokeWeight(1);
    point(x, y);
  }
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

    text("press enter to start again", SIZES.canvasWidth / 3, 400);

    return;
  }

  if (gameState === "over") {
    gameOver();
    lives = NUMBERS.maxLives; // reset lives
    return;
  }

  if (gameState === "play") {
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

    if (isJumping && !isFalling && !isPlummeting) {
      gameChar_y -= SIZES.jumpElevation;
      isJumping = false;
    }

    if (gameChar_y >= floorPos_y && insideCanyon) {
      // inside canyon and falling!
      isPlummeting = true;
      isLeft = false;
      isRight = false;
    } else {
      isPlummeting = false;
    }

    if (gameScore === NUMBERS.maxScore && flagpole.isReached) {
      gameState = "complete";
    }

    tooFarLeft = gameChar_world_x <= SIZES.catPosX;

    if (isLeft && !tooFarLeft) {
      if (gameChar_x > width * 0.2) {
        gameChar_x -= 5;
      } else {
        scrollPos += 5;
      }
    } else if (isRight) {
      if (gameChar_x < width * 0.8) {
        gameChar_x += 5;
      } else {
        scrollPos -= 5;
      }
    }

    isFalling = false;
    if (
      (gameChar_y < floorPos_y && !insideCanyon) ||
      (insideCanyon && gameChar_y < floorPos_y + 120)
    ) {
      let isContact = false;

      for (let i = 0; i < platforms.length; i++) {
        if (platforms[i].checkContact(gameChar_world_x, gameChar_y)) {
          isContact = true;
          break;
        }
      }
      if (!isContact) {
        isFalling = true;
      }
    }

    if (isFalling) {
      gameChar_y += 3;
      if (!isPlummeting && gameChar_y > floorPos_y) {
        gameChar_y = floorPos_y;
      }
    }

    if (isPlummeting) {
      gameChar_y += 5;
    }

    push();

    translate(scrollPos, 0);

    gameChar_world_x = gameChar_x - scrollPos;

    drawMountains();
    drawClouds(clouds);
    drawTrees();

    for (let i = 0; i < platforms.length; i++) {
      platforms[i].draw();
      platforms[i].move();
    }

    //draw canyons
    for (let i = 0; i < canyons.length; i++) {
      drawCanyon(canyons[i]);
    }

    checkCanyons();

    checkPlayerDie();

    if (!flagpole.isReached) {
      checkFlagPole();
    }

    //draw collectables
    for (var i = 0; i < collectables.length; i++) {
      if (!collectables[i].isFound) {
        drawCollectable(collectables[i]);
      }
    }

    checkCollectables();

    // render the black cat
    image(cat, SIZES.catPosX, SIZES.catPosY);

    renderFlagPole();
    pop();

    // draw lives icons
    for (let i = 0; i < lives; i++) {
      image(liveIcon, 28 + i * 25, 30, 20, 20);
    }

    // draw game score
    fill(255);
    noStroke();
    text("score " + gameScore, 30, 20);

    // render character in different states
    if (isLeft && isFalling) {
      renderCharacterJumpLeft();
    } else if (isLeft && !isFalling) {
      renderCharacterWalkLeft();
    } else if (isRight && isFalling) {
      renderCharacterJumpRight();
    } else if (isRight && !isFalling) {
      renderCharacterWalkRight();
    } else if (isFalling) {
      renderCharacterJump();
    } else if (isPlummeting) {
      renderCharacterJump();
    } else {
      renderCharacterFront();
    }
  }
}
