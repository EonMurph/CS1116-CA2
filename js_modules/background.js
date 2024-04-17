import { createMap } from "./wfc/wfc.js";

export const background = {
  tilesPerRow: 2,
  numCols: 320 / 16,
  numRows: 256 / 16,
  tileSize: 16,
  // backgroundImage: new Image(),
};

// prettier-ignore
[background.map, background.tiles] = createMap(35);
