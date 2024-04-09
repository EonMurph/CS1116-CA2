import { createMap } from "./wfc/wfc.js"
export const background = {
  tilesPerRow: 2,
  numCols: 20,
  numRows: 16,
  tileSize: 64,
  // backgroundImage: new Image(),
};

// prettier-ignore
[background.map, background.tiles] = createMap(20);