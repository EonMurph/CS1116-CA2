import { DIM } from "./grid.js";

export function indexToCR(index) {
  let r = index % DIM;
  let c = Math.floor(index / DIM);

  return [r, c];
}

export function CRToIndex(CR) {
  let c = CR[0];
  let r = CR[1];
  return r * DIM + c;
}

export function safeNeighbour(CR, deltaCR) {
  let newCR = [];
  for (let i = 0; i < CR.length; i++) {
    newCR.push(CR[i] + deltaCR[i]);
  }

  for (let i = 0; i < newCR.length; i++) {
    if (newCR[i] < 0 || newCR[i] >= DIM) {
      return null;
    }
  }
  return newCR;
}
