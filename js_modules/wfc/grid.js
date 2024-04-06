export function createGrid(dimension, tiles) {
  const grid = [];
  for (let r = 0; r < dimension; r++) {
    for (let c = 0; c < dimension; c++) {
      let cell = {
        tile: null,
        options: [tiles.BLANK, tiles.UP, tiles.RIGHT, tiles.LEFT, tiles.DOWN],
        c,
        r,
      };
      cell.entropy = cell.options.length;
      grid.push(cell);
    }
  }

  return grid;
}
