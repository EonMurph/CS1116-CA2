export const tiles = [];
export const BLANK = 0;
export const UP = 1;
export const RIGHT = 2;
export const DOWN = 4;
export const LEFT = 3;

export const tileSize = 64;

tiles[BLANK] = {
  tile: "blank",
  image: new Image(),
  rules: [
    [BLANK, UP], // these tiles can be placed above
    [BLANK, RIGHT], // these tiles can be placed to the right
    [BLANK, LEFT], // these tiles can be placed to the left
    [BLANK, DOWN], // these tiles can be placed under
  ],
};
tiles[UP] = {
  tile: "up",
  image: new Image(),
  rules: [
    [RIGHT, DOWN, LEFT], // up
    [UP, DOWN, LEFT], // right
    [UP, RIGHT, DOWN], // left
    [BLANK, DOWN], // down
  ],
};
tiles[RIGHT] = {
  tile: "right",
  image: new Image(),
  rules: [
    [RIGHT, DOWN, LEFT], // up
    [UP, DOWN, LEFT], // right
    [BLANK, LEFT], // left
    [UP, RIGHT, LEFT], // down
  ],
};
tiles[DOWN] = {
  tile: "down",
  image: new Image(),
  rules: [
    [BLANK, UP], // up
    [UP, DOWN, LEFT], // right
    [UP, RIGHT, DOWN], // left
    [UP, RIGHT, LEFT], // down
  ],
};
tiles[LEFT] = {
  tile: "left",
  image: new Image(),
  rules: [
    [RIGHT, DOWN, LEFT], // up
    [BLANK, RIGHT], // right
    [UP, RIGHT, DOWN], // left
    [UP, RIGHT, LEFT], // down
  ],
};
