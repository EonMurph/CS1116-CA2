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
    DOOR: DOOR,
  };

  tiles.tiles[BLANK] = {
    tile: "blank",
    image: new Image(),
    rules: [
      [BLANK, UP, DOOR], // these tiles can be placed above
      [BLANK, RIGHT, DOOR], // these tiles can be placed to the right
      [BLANK, LEFT, DOOR], // these tiles can be placed to the left
      [BLANK, DOWN, DOOR], // these tiles can be placed under
    ],
  };
  tiles.tiles[UP] = {
    tile: "up",
    image: new Image(),
    rules: [
      [RIGHT, DOWN, LEFT, DOOR], // up
      [UP, DOWN, LEFT, DOOR], // right
      [UP, RIGHT, DOWN, DOOR], // left
      [BLANK, DOWN, DOOR], // down
    ],
  };
  tiles.tiles[RIGHT] = {
    tile: "right",
    image: new Image(),
    rules: [
      [RIGHT, DOWN, LEFT, DOOR], // up
      [UP, DOWN, LEFT, DOOR], // right
      [BLANK, LEFT, DOOR], // left
      [UP, RIGHT, LEFT, DOOR], // down
    ],
  };
  tiles.tiles[LEFT] = {
    tile: "left",
    image: new Image(),
    rules: [
      [RIGHT, DOWN, LEFT, DOOR], // up
      [BLANK, RIGHT, DOOR], // right
      [UP, RIGHT, DOWN, DOOR], // left
      [UP, RIGHT, LEFT, DOOR], // down
    ],
  };
  tiles.tiles[DOWN] = {
    tile: "down",
    image: new Image(),
    rules: [
      [BLANK, UP, DOOR], // up
      [UP, DOWN, LEFT, DOOR], // right
      [UP, RIGHT, DOWN, DOOR], // left
      [UP, RIGHT, LEFT, DOOR], // down
    ],
  };
  tiles.tiles[DOOR] = {
    tile: "door",
    image: new Image(),
    rules: [
      [BLANK, UP, DOWN, RIGHT, LEFT], // up
      [BLANK, UP, DOWN, RIGHT, LEFT], // right
      [BLANK, UP, DOWN, RIGHT, LEFT], // left
      [BLANK, UP, DOWN, RIGHT, LEFT], // down
    ],
  };

  return tiles;
}
