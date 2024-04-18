import { safeNeighbour, indexToCR, CRToIndex } from "./adjacent.js";
import { context, choice, solved, grid } from "./script.js";
import { tiles } from "./tiles.js";

export function calculateEntropy() {
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
    let CR = indexToCR(grid.indexOf(cell));
    for (let i = 0; i < directions.length; i++) {
      let newCR = safeNeighbour(CR, directions[i]);
      if (newCR === null) {
        continue;
      }
      let neighbourCellIndex = CRToIndex(newCR);
      if (grid[neighbourCellIndex].tile !== null) {
        let ruleIndex = directions.length - 1 - i;
        let options = cell.options;
        let rules = grid[neighbourCellIndex].tile.rules[ruleIndex];
        // intersection of two arrays found at:
        // https://stackoverflow.com/a/1885569
        cell.options = options.filter((value) => rules.includes(value));
      }
    }
    cell.entropy = cell.options.length;
  }
}

export function collapse() {
  let lowestCellEntropy;
  let possibleChoices = [];

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

  let possibleChoicesCellIndex = choice(possibleChoices);
  let cell = possibleChoices[possibleChoicesCellIndex];
  let chosenTile;
  try {
    chosenTile = tiles[cell.options[choice(cell.options)]];
  } catch (error) {
    return false;
  }
  context.drawImage(chosenTile.image, cell.x, cell.y);
  cell.tile = chosenTile;
  cell.options = [];
  cell.entropy = 0;

  grid[grid.indexOf(cell)] = cell;
  return true;
}
