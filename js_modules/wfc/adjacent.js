export function indexToCR(index, dimension) {
  let r = index % dimension;
  let c = Math.floor(index / dimension);

  return [r, c];
}

export function safeNeighbour(CR, deltaCR, dimension) {
  let newCR = [];
  for (let i = 0; i < CR.length; i++) {
    newCR.push(CR[i] + deltaCR[i]);
  }

  for (let i = 0; i < newCR.length; i++) {
    if (newCR[i] < 0 || newCR[i] >= dimension) {
      return null;
    }
  }

  return newCR;
}

export function CRToIndex(CR, dimension) {
  let c = CR[0];
  let r = CR[1];

  return r * dimension + c;
}
