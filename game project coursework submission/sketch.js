var gameChar_x = 0;
var gameChar_y = 0;
var treePos_x = 0;
var treePos_y = 0;
var floorPos_x = 0;
var floorPos_y = 0;
var canyon = {};
var collectible = {};
var cloud = {};
var mountains = {};

var isLeft = false;
var isRight = false;
var isFalling = false;
var isPlummeting = false;
var isJumping = false;
var isFound = false;

var KEY_CODE_LEFT = 37;
var KEY_CODE_RIGHT = 39;
var KEY_CODE_SPACE = 32;
var scrollPos;

var trees_x = [-1000, -750, -300, 40, 600, 800, 1300, 2000, 2400, 2700];
var clouds = [-1000, -800, -100, 200, 620, 850, 1550, 1700, 2400];
var collectibles_X = [180, 1400];
var mountains_x = [300, 1500];
var mountains_x_snow = [500, 1700];
var canyons_x = [-500, 120, 900, 1100];

let cat;
function preload() {
    cat = loadImage('assets/cat_face.png');
}

function setup() {
    createCanvas(1024, 576);
    treePos_y = 305;

    gameChar_x = 800;
    gameChar_y = 432;

    floorPos_x = 0;
    floorPos_y = 432;

    canyon = {
        x_pos_1: 120,
        x_pos_2: 400,
        width: 120, depth: 120,
    };

    collectible = {y_pos: 280, size: 50};

    cloud = {
        y_pos: 100,
        width: 70,
        height: 50,
    }

    mountains = {
        snow_x_pos: 500,
        snow_y_pos: 250,
        mountain_x_pos: 300,
        mountain_y_pos: 200
    }

    scrollPos = 0;



}

function renderCharacterFront() {
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
    fill(255, 203, 0);
    stroke(0);
    rect(gameChar_x - 13, gameChar_y - 35, 26, 30);

    //feet
    fill(0);
    rect(gameChar_x - 15, gameChar_y - 5, 10, 10); // left foot
    rect(gameChar_x + 5, gameChar_y - 5, 10, 10); // right foot

    // hands
    fill(200, 150, 150);
    rect(gameChar_x - 23, gameChar_y - 33, 10, 10);
    rect(gameChar_x + 13, gameChar_y - 33, 10, 10);
}

function renderTree(xPos) {
    noStroke();
    fill(255);
    fill(69, 38, 38);
    rect(xPos, treePos_y, 35, 132);
    stroke(69, 38, 38);

    line(xPos + 35, treePos_y + 64, xPos + 60, treePos_y + 40);
    line(xPos, treePos_y + 90, xPos - 20, treePos_y + 40);

    noStroke();

    fill(54, 202, 79);
    triangle(xPos - 30, treePos_y + 19, xPos + 18, treePos_y - 100, xPos + 70, treePos_y + 19);
}

function renderClouds(xPos) {
    noStroke();
    fill(78, 191, 239);

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

function renderCanyons(xPos) {
    fill(100, 155, 255);
    rect(xPos, 432, canyon.width, canyon.width + 30);
    fill(37, 0, 225);
    rect(xPos, 530, 120, 130);
}

function renderCollectibles(xPos) {
    fill(226, 184, 54);
    ellipse(xPos - 5, collectible.y_pos, collectible.size - 10, collectible.size); // coin edge

    fill(250, 237, 54);
    ellipse(xPos, collectible.y_pos, collectible.size - 10, collectible.size);
    textSize(30);

    textFont('Georgia');

    fill(186, 144, 14); // text shadow
    text("$", xPos - 8, collectible.y_pos + 10);
    fill(250, 237, 54);
    text("$", xPos - 10, collectible.y_pos + 10);
}

function renderMountains(xPos, snowXPos) {
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


function keyPressed() {
    if (keyCode === KEY_CODE_LEFT) {
        isLeft = true;
    }
    if (keyCode === KEY_CODE_RIGHT) {
        isRight = true;
    }
    if (keyCode === KEY_CODE_SPACE) {
        isJumping = true;

    }

}

function keyReleased() {
    if (keyCode === KEY_CODE_LEFT) {
        isLeft = false;
    }
    if (keyCode === KEY_CODE_RIGHT) {
        isRight = false;
    }
    if (keyCode === KEY_CODE_SPACE) {
        isPlummeting = false;
    }
}

function draw() {
    background(100, 155, 255); //fill the sky blue
    noStroke();
    fill(0, 155, 0);
    rect(floorPos_x, floorPos_y, 1024, 144); //draw some green ground

    var realGameChar_x = gameChar_x - scrollPos; // define a real game character coordinates
    var distanceToFirstCollectible = dist(collectibles_X[0], collectible.y_pos, realGameChar_x, gameChar_y);
    var distanceToSecondCollestible = dist(collectibles_X[1], collectible.y_pos, realGameChar_x, gameChar_y);

    if (distanceToFirstCollectible <= 100 || distanceToSecondCollestible <= 100) {
        isFound = true;
    }

    if (isJumping && gameChar_y === floorPos_y) {
        gameChar_y -= 100;
        isJumping = false;
    }

    var insideCanyon = false; // detect whether character is inside the canyon
    for (let i = 0; i < canyons_x.length; i++) {
        if ((realGameChar_x < canyons_x[i] + canyon.width) && realGameChar_x > canyons_x[i]) {
            insideCanyon = true;
            break;
        }
    }

    if (gameChar_y >= floorPos_y && insideCanyon) {
        // inside canyon and falling!
        isPlummeting = true;
        isLeft = false;
        isRight = false;
    } else {
        isPlummeting = false;
    }

    if (isLeft) {
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


    isFalling = (gameChar_y < floorPos_y && !insideCanyon) || (insideCanyon && gameChar_y < floorPos_y + 120);

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

    translate(scrollPos, 0); // implement scrolling

    // render mountains
    for (let m = 0; m < mountains_x.length; m++) {
        renderMountains(mountains_x[m], mountains_x_snow[m])
    }

    // render trees
    for (let i = 0; i < trees_x.length; i++) {
        renderTree(trees_x[i])
    }

    // render clouds
    for (let i = 0; i < clouds.length; i++) {
        renderClouds(clouds[i]);
    }

    // render canyons
    for (let i = 0; i < canyons_x.length; i++) {
        renderCanyons(canyons_x[i]);
    }

    if (!isFound) {
        // if collectibles is not found yet, render collectible items
        for (let i = 0; i < collectibles_X.length; i++) {
            renderCollectibles(collectibles_X[i]);
        }
    }

    // render the black cat, my favorite character at home :p
    image(cat, 10, treePos_y + 60);

    pop();

    // render game character front facing
    renderCharacterFront();

}
