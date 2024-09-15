export default function createTiles() {
  const BLANK = 0;
  // const UP = 1;
  // const RIGHT = 2;
  // const LEFT = 3;
  // const DOWN = 4;
  //// const DOOR = 5;
  const leftWall = 1;
  const rightWall = 2;
  const topWall = 3;
  const bottomWall = 4;
  const topLeftCornerWall = 5;
  const topRightCornerWall = 6;
  const bottomRightCornerWall = 7;
  const bottomLeftCornerWall = 8;
  const GROUND = 9;

  const tiles = {
    tiles: [],
    BLANK: BLANK,
    // UP: UP,
    // RIGHT: RIGHT,
    // LEFT: LEFT,
    // DOWN: DOWN,
    //// DOOR: DOOR,
    leftWall: leftWall,
    rightWall: rightWall,
    topWall: topWall,
    bottomWall: bottomWall,
    topLeftCornerWall: topLeftCornerWall,
    topRightCornerWall: topRightCornerWall,
    bottomRightCornerWall: bottomRightCornerWall,
    bottomLeftCornerWall: bottomLeftCornerWall,
    GROUND: GROUND,
  };

  tiles.tiles[BLANK] = {
    tile: "blank",
    image: new Image(),
    rules: [
      [/*BLANK*/, bottomWall, /*bottomLeftCornerWall, bottomRightCornerWall*/], // above
      [/*BLANK*/, leftWall, /*bottomLeftCornerWall, topLeftCornerWall*/], // to right
      [/*BLANK*/, rightWall, /*bottomRightCornerWall, topRightCornerWall*/], // to left
      [/*BLANK*/, topWall, /*topLeftCornerWall, topRightCornerWall*/], // under
    ],
  };
  // tiles.tiles[verticalWall] = {
  //   tile: "verticalWall",
  //   image: new Image(),
  //   rules: [
  //     [verticalWall, topLeftCornerWall, topRightCornerWall], // these tiles can be placed above
  //     [GROUND, /* BLANK */], // these tiles can be placed to the right
  //     [GROUND, /* BLANK */], // these tiles can be placed to the left
  //     [verticalWall, bottomLeftCornerWall, bottomRightCornerWall], // these tiles can be placed under
  //   ],
  // };
  // tiles.tiles[horizontalWall] = {
  //   tile: "horizontalWall",
  //   image: new Image(),
  //   rules: [
  //     [/* BLANK */, GROUND], // above
  //     [topRightCornerWall, bottomRightCornerWall], // to right
  //     [topLeftCornerWall, bottomLeftCornerWall], // to left
  //     [GROUND, /* BLANK */], // under
  //   ]
  // };
  tiles.tiles[leftWall] = {
    tile: "leftWall",
    image: new Image(),
    rules: [
      [/*leftWall,*/ topLeftCornerWall], // above
      [GROUND], // to right
      [/*BLANK,*/ /*rightWall*/], // to left
      [/*leftWall,*/ bottomLeftCornerWall], // under
    ],
  };
  tiles.tiles[rightWall] = {
    tile: "rightWall",
    image: new Image(),
    rules: [
      [/*rightWall,*/ topRightCornerWall], // above
      [/*BLANK,*/ /*leftWall*/], // to right
      [GROUND], // to left
      [/*rightWall,*/ bottomRightCornerWall], // under
    ],
  };
  tiles.tiles[topWall] = {
    tile: "topWall",
    image: new Image(),
    rules: [
      [/*BLANK,*/ /*bottomWall*/], // above
      [/*topWall,*/ topRightCornerWall], // to right
      [/*topWall,*/ topLeftCornerWall], // to left
      [GROUND], // under
    ],
  };
  tiles.tiles[bottomWall] = {
    tile: "bottomWall",
    image: new Image(),
    rules: [
      [GROUND], // above
      [/*bottomWall,*/ bottomRightCornerWall], // to right
      [/*bottomWall,*/ bottomLeftCornerWall], // to left
      [/*BLANK,*/ /*topWall*/], // under
    ],
  };
  tiles.tiles[topLeftCornerWall] = {
    tile: "topLeftCornerWall",
    image: new Image(),
    rules: [
      [/*BLANK,*/, /*bottomLeftCornerWall*/], // above
      [topWall, /*topRightCornerWall*/], // to right
      [/*BLANK,*/ /*topRightCornerWall*/], // to left
      [leftWall, /*bottomLeftCornerWall*/], // under
    ],
  };
  tiles.tiles[topRightCornerWall] = {
    tile: "topRightCornerWall",
    image: new Image(),
    rules: [
      [/*BLANK,*/ /*bottomRightCornerWall*/], // above
      [/*BLANK,*/ /*topLeftCornerWall*/], // to right
      [topWall, /*topLeftCornerWall*/], // to left
      [rightWall, /*bottomRightCornerWall*/], // under
    ],
  };
  tiles.tiles[bottomRightCornerWall] = {
    tile: "bottomRightCornerWall",
    image: new Image(),
    rules: [
      [rightWall, /*topRightCornerWall*/], // above
      [/*BLANK,*/ /*bottomLeftCornerWall*/], // to right
      [bottomWall, /*bottomLeftCornerWall*/], // to left
      [/*BLANK,*/ /*topRightCornerWall*/], // under
    ],
  };
  tiles.tiles[bottomLeftCornerWall] = {
    tile: "bottomLeftCornerWall",
    image: new Image(),
    rules: [
      [leftWall, /*topLeftCornerWall*/], // above
      [bottomWall, /*bottomRightCornerWall*/], // to right
      [/*BLANK,*/ /*bottomRightCornerWall*/], // to left
      [/*BLANK,*/ /*topLeftCornerWall*/], // under
    ],
  };
  tiles.tiles[GROUND] = {
    tile: "ground",
    image: new Image(),
    rules: [
      [GROUND, topWall, GROUND], // above
      [GROUND, rightWall, GROUND], // to right
      [GROUND, leftWall, GROUND], // to left
      [GROUND, bottomWall, GROUND ], // under
    ],
  };

  // tiles.tiles[BLANK] = {
  //   tile: "blank",
  //   image: new Image(),
  //   rules: [
  //     [BLANK, UP], // these tiles can be placed above
  //     [BLANK, RIGHT], // these tiles can be placed to the right
  //     [BLANK, LEFT], // these tiles can be placed to the left
  //     [BLANK, DOWN], // these tiles can be placed under
  //   ],
  // };
  // tiles.tiles[UP] = {
  //   tile: "up",
  //   image: new Image(),
  //   rules: [
  //     [RIGHT, DOWN, LEFT], // up
  //     [UP, DOWN, LEFT], // right
  //     [UP, RIGHT, DOWN], // left
  //     [BLANK, DOWN], // down
  //   ],
  // };
  // tiles.tiles[RIGHT] = {
  //   tile: "right",
  //   image: new Image(),
  //   rules: [
  //     [RIGHT, DOWN, LEFT], // up
  //     [UP, DOWN, LEFT], // right
  //     [BLANK, LEFT], // left
  //     [UP, RIGHT, LEFT], // down
  //   ],
  // };
  // tiles.tiles[LEFT] = {
  //   tile: "left",
  //   image: new Image(),
  //   rules: [
  //     [RIGHT, DOWN, LEFT], // up
  //     [BLANK, RIGHT], // right
  //     [UP, RIGHT, DOWN], // left
  //     [UP, RIGHT, LEFT], // down
  //   ],
  // };
  // tiles.tiles[DOWN] = {
  //   tile: "down",
  //   image: new Image(),
  //   rules: [
  //     [BLANK, UP], // up
  //     [UP, DOWN, LEFT], // right
  //     [UP, RIGHT, DOWN], // left
  //     [UP, RIGHT, LEFT], // down
  //   ],
  // };
  // // tiles.tiles[DOOR] = {
  // //   tile: "door",
  // //   image: new Image(),
  // //   rules: [
  // //     [BLANK, UP, DOWN, RIGHT, LEFT], // up
  // //     [BLANK, UP, DOWN, RIGHT, LEFT], // right
  // //     [BLANK, UP, DOWN, RIGHT, LEFT], // left
  // //     [BLANK, UP, DOWN, RIGHT, LEFT], // down
  // //   ],
  // // };

  return tiles;
}
