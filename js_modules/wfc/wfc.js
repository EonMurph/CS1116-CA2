import { createTiles } from "./tiles.js";
import { createGrid } from "./grid.js";
import { calculateEntropy, collapse } from "./collapse.js";
import { CRToIndex } from "./adjacent.js";

export function createMap(dimension) {
  let grid;
  const tiles = createTiles();
  let solved = false;

  while (!solved) {
    grid = createGrid(dimension, tiles);

    for (let i = 0; i < grid.length; i++) {
      [grid, solved] = collapse(grid, tiles);
      grid = calculateEntropy(grid, dimension);
    }
  }

  let map = [];
  for (let r = 0; r < dimension; r++) {
    map[r] = [];
    for (let c = 0; c < dimension; c++) {
      let tile = grid[CRToIndex([c, r], dimension)].tile;
      map[r].push(tiles.tiles.indexOf(tile));
    }
  }
  return [map, tiles];
}

export function choice(array) {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
