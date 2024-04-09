import { safeNeighbour, indexToCR, CRToIndex } from "./adjacent.js";
import { choice } from "./wfc.js";

export function calculateEntropy(grid, dimension) {
  const directions = [
    [0, -1], // checking up
    [1, 0], // checking right
    [-1, 0], // checking left
    [0, 1], // checking down
  ];

  for (let cell of grid) {
    if (cell.tile !== null) {
      continue;
    }
    let CR = indexToCR(grid.indexOf(cell), dimension);
    for (let i = 0; i < directions.length; i++) {
      let newCR = safeNeighbour(CR, directions[i], dimension);
      if (newCR === null) {
        continue;
      }
      let safeNeighbourCellIndex = CRToIndex(newCR, dimension);
      if (grid[safeNeighbourCellIndex].tile !== null) {
        let ruleIndex = directions.length - 1 - i;
        let options = cell.options;
        let rules = grid[safeNeighbourCellIndex].tile.rules[ruleIndex];
        // intersections of two arrays found at:
        // https://stackoverflow.com/a/1885569
        cell.options = options.filter((tile) => rules.includes(tile));
      }
    }
    cell.entropy = cell.options.length;
  }

  return grid;
}

export function collapse(grid, tiles) {
  let lowestCellEntropy;
  let possibleChoices = [];

  // if (tiles.DOOR) {
  //   let rowOrCol = choice(["r", "c"]);
  //   if (rowOrCol === "r") {
  //     let rowIndex = choice([0, grid.length - 1 - dimension]);
  //     let row = grid.slice(rowIndex, rowIndex + dimension);
  //     possibleChoices.push(choice(row))
  //     console.log(possibleChoices);
  //   } else if (rowOrCol === "c") {
  //   } else {
  //     console.log("error");
  //   }
  //   for (let tileIndex = 0; tileIndex < tiles.tiles.length; tileIndex++) {
  //     for (let ruleIndex = 0; ruleIndex < tiles.tiles[tileIndex].rules.length; ruleIndex++) {
  //       let rule = tiles.tiles[tileIndex].rules[ruleIndex];
  //       tiles.tiles[tileIndex].rules[ruleIndex] = rule.filter(tle => tle !== tiles.DOOR);
  //     }
  //   }
  //   delete tiles.DOOR;
  // } else {
  for (let cell of grid) {
    if (
      (!lowestCellEntropy || cell.entropy < lowestCellEntropy) &&
      cell.entropy > 0
    ) {
      lowestCellEntropy = cell.entropy;
    }
  }
  for (let cell of grid) {
    if (cell.entropy === lowestCellEntropy) {
      possibleChoices.push(cell);
    }
  }
  // }

  let cell = choice(possibleChoices);
  let cellIndex = grid.indexOf(cell);
  let chosenTile;
  try {
    chosenTile = tiles.tiles[choice(cell.options)];
  } catch (error) {
    return [grid, false];
  }
  cell.tile = chosenTile;
  cell.options = [];
  cell.entropy = 0;

  grid[cellIndex] = cell;

  return [grid, true];
}
