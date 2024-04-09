export function createTiles() {
  const BLANK = 0;
  const UP = 1;
  const RIGHT = 2;
  const LEFT = 3;
  const DOWN = 4;
  const DOOR = 5;

  const tiles = {
    tiles: [],
    BLANK: BLANK,
    UP: UP,
    RIGHT: RIGHT,
    LEFT: LEFT,
    DOWN: DOWN,
    // DOOR: DOOR,
  };

  tiles.tiles[BLANK] = {
    tile: "blank",
    image: new Image(),
    rules: [
      [BLANK, UP], // these tiles can be placed above
      [BLANK, RIGHT], // these tiles can be placed to the right
      [BLANK, LEFT], // these tiles can be placed to the left
      [BLANK, DOWN], // these tiles can be placed under
    ],
  };
  tiles.tiles[UP] = {
    tile: "up",
    image: new Image(),
    rules: [
      [RIGHT, DOWN, LEFT], // up
      [UP, DOWN, LEFT], // right
      [UP, RIGHT, DOWN], // left
      [BLANK, DOWN], // down
    ],
  };
  tiles.tiles[RIGHT] = {
    tile: "right",
    image: new Image(),
    rules: [
      [RIGHT, DOWN, LEFT], // up
      [UP, DOWN, LEFT], // right
      [BLANK, LEFT], // left
      [UP, RIGHT, LEFT], // down
    ],
  };
  tiles.tiles[LEFT] = {
    tile: "left",
    image: new Image(),
    rules: [
      [RIGHT, DOWN, LEFT], // up
      [BLANK, RIGHT], // right
      [UP, RIGHT, DOWN], // left
      [UP, RIGHT, LEFT], // down
    ],
  };
  tiles.tiles[DOWN] = {
    tile: "down",
    image: new Image(),
    rules: [
      [BLANK, UP], // up
      [UP, DOWN, LEFT], // right
      [UP, RIGHT, DOWN], // left
      [UP, RIGHT, LEFT], // down
    ],
  };
  // tiles.tiles[DOOR] = {
  //   tile: "door",
  //   image: new Image(),
  //   rules: [
  //     [BLANK, UP, DOWN, RIGHT, LEFT], // up
  //     [BLANK, UP, DOWN, RIGHT, LEFT], // right
  //     [BLANK, UP, DOWN, RIGHT, LEFT], // left
  //     [BLANK, UP, DOWN, RIGHT, LEFT], // down
  //   ],
  // };

  return tiles;
}
