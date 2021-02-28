const keyCodes = {
  KEY_CODE_LEFT: 37,
  KEY_CODE_RIGHT: 39,
  KEY_CODE_SPACE: 32,
  KEY_CODE_ENTER: 13,
};

const COLORS = {
  treeCrown: [63, 90, 56],
  treeTrunk: [67, 58, 34],
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

const trees_x = [-300, 40, 600, 800, 1370, 2000, 2400, 2700, 3000, 3400];

const collectables = [
  { x_pos: 200, isFound: false, y_pos: 230, size: 50 },
  { x_pos: 700, isFound: false, y_pos: 240, size: 50 },
  { x_pos: 1250, isFound: false, y_pos: 210, size: 50 },
  { x_pos: 1050, isFound: false, y_pos: 290, size: 50 },
  { x_pos: 2250, isFound: false, y_pos: 290, size: 50 },
  { x_pos: 1420, isFound: false, y_pos: 115, size: 50 },
];

const NUMBERS = {
  maxLives: 3,
  minLives: 1,
  maxScore: collectables.length,
};
