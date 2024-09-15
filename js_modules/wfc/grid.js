export default function createGrid(dimension, tiles) {
  const grid = [];
  for (let r = 0; r < dimension; r++) {
    for (let c = 0; c < dimension; c++) {
      let cell = {
        tile: null,
        options: Array.from(Array(tiles.tiles.length).keys()),
        c,
        r,
      };
      if (r === 0 || r === dimension - 1 || c === 0 || c === dimension - 1) {
        cell.tile = tiles.tiles[tiles.BLANK];
        cell.options = [];
      } else if (r === 1) {
        if (c === 1) {
          cell.tile = tiles.tiles[tiles.topLeftCornerWall];
          cell.options = [];
        } else if (c === dimension - 2) {
          cell.tile = tiles.tiles[tiles.topRightCornerWall];
          cell.options = [];
        }
      } else if (r === dimension - 2) {
        if (c === 1) {
          cell.tile = tiles.tiles[tiles.bottomLeftCornerWall];
          cell.options = [];
        } else if (c === dimension - 2) {
          cell.tile = tiles.tiles[tiles.bottomRightCornerWall];
          cell.options = [];
        }
      }
      cell.entropy = cell.options.length;
      grid.push(cell);
    }
  }
  return grid;
}
