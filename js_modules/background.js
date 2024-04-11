import { createMap } from "./wfc/wfc.js";

export const background = {
  tilesPerRow: 2,
  numCols: 32,
  numRows: 26,
  tileSize: 16,
  // backgroundImage: new Image(),
};

// prettier-ignore
[background.map, background.tiles] = createMap(35);
