import createTiles from "./tiles.js";
import createGrid from "./grid.js";
import { calculateEntropy, collapse } from "./collapse.js";
import { CRToIndex } from "./adjacent.js";

export function createMap(dimension) {
  const tiles = createTiles();
  let grid;
  let solved = false;

  // while (!solved) {
  grid = createGrid(dimension, tiles);

  for (let i = 0; i < grid.length; i++) {
    grid = calculateEntropy(grid, dimension);
    [grid, solved] = collapse(grid, tiles);
  }
  // };

  let map = [];
  for (let r = 0; r < dimension; r++) {
    map[r] = [];
    for (let c = 0; c < dimension; c++) {
      let tile = grid[CRToIndex([c, r], dimension)].tile;
      map[r].push(tiles.tiles.indexOf(tile));
    }
  }
  // for (let r = 0; r < map.length; r++) {
  //   for (let c = 0; c < map.length; c++) {
  //     if (map[r][c] === 5) {
  //       console.log(map[r][c]);
  //     }
  //   }
  // }
  return [map, tiles];
}

export function choice(array) {
  let randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
