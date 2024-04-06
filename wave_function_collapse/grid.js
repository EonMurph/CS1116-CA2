import { BLANK, UP, RIGHT, DOWN, LEFT, tileSize } from "./tiles.js";
export const grid = [];
export const DIM = 32;
for (let r = 0; r < DIM; r++) {
  for (let c = 0; c < DIM; c++) {
    let cell = {
      tile: null,
      options: [BLANK, UP, RIGHT, DOWN, LEFT],
      x: tileSize * c,
      y: tileSize * r,
      r,
      c,
    };
    cell.entropy = cell.options.length;
    grid.push(cell);
  }
}
