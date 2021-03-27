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
  collectable: {
    inner: [250, 237, 54],
    outer: [226, 184, 54],
  },
  startScreen: [0, 0, 0],
  startScreentext: [0, 0, 0],
  platform: [180, 178, 181],
  moon: [230, 230, 180],
  catBubble: [242, 212, 75],
  black: [0, 0, 0],
  enemy: [247, 239, 231],
};

const SIZES = {
  canvasWidth: 1024,
  canvasHeight: 576,
  characterBody: 35,
  platform: 10,
  jumpElevation: 150,
};

const LOCATIONS = {
  flagpoleX: 4000,
  floorPosY: 432,
  catPosX: -10,
  catPosY: 360,
};

const trees_x = [-300, 40, 600, 800, 1370, 2000, 2400, 2700, 3000, 3400];

const collectablesCoords = [
  { x_pos: 200, y_pos: 230, size: 50 },
  { x_pos: 700, y_pos: 240, size: 50 },
  { x_pos: 1250, y_pos: 210, size: 50 },
  { x_pos: 1050, y_pos: 290, size: 50 },
  { x_pos: 2250, y_pos: 290, size: 50 },
  { x_pos: 1420, y_pos: 115, size: 50 },
  { x_pos: 1653, y_pos: 198, size: 50 },
  { x_pos: 2000, y_pos: 240, size: 50 },
  // { x_pos: 2800, y_pos: 198, size: 50 },
  { x_pos: 3300, y_pos: 198, size: 50 },
  { x_pos: 2600, y_pos: 210, size: 50 },
  { x_pos: 2820, y_pos: 130, size: 50 },
  { x_pos: 2983, y_pos: 115, size: 50 },
];

const platformsCoords = [
  { x_pos: 150, y_pos: SIZES.floorPosY - 100, length: 75, isMoving: false },
  { x_pos: 1000, y_pos: SIZES.floorPosY - 105, length: 110, isMoving: false },
  { x_pos: 1200, y_pos: SIZES.floorPosY - 150, length: 100, isMoving: true },
  { x_pos: 1100, y_pos: SIZES.floorPosY - 200, length: 80, isMoving: false },
  { x_pos: 1400, y_pos: SIZES.floorPosY - 250, length: 100, isMoving: false },
  { x_pos: 2500, y_pos: SIZES.floorPosY - 130, length: 110, isMoving: true },
  { x_pos: 2690, y_pos: SIZES.floorPosY - 200, length: 120, isMoving: true },
  { x_pos: 2900, y_pos: SIZES.floorPosY - 250, length: 120, isMoving: true },
];

const enemiesCoords = [
  { x_pos: 340, y_pos: 400 },
  { x_pos: 800, y_pos: 400 },
  { x_pos: 1405, y_pos: 400 },
  { x_pos: 1900, y_pos: 400 },
  { x_pos: 2750, y_pos: 400 },
];

const NUMBERS = {
  maxLives: 3,
  minLives: 1,
  maxScore: collectablesCoords.length,
};

const canyons = [
  {
    x_pos: 120,
    width: 120,
    depth: 120,
    isCharacterInside: false,
  },
  { x_pos: 1000, width: 120, depth: 120, isCharacterInside: false },
  { x_pos: 3130, width: 120, depth: 120, isCharacterInside: false },
];
