import { calculateEntropy, collapse } from "./collapse.js";
import { tiles, BLANK, UP, RIGHT, DOWN, LEFT } from "./tiles.js";
import { grid } from "./grid.js";

// INIT HTML ELEMENTS
let canvas;
export let context;

document.addEventListener("DOMContentLoaded", init, false);

// INIT CANVAS
function init() {
  canvas = document.querySelector("canvas");
  context = canvas.getContext("2d");

  loadAssets(
    [
      { var: tiles[BLANK].image, url: "tiles/blank.png" },
      { var: tiles[UP].image, url: "tiles/up.png" },
      { var: tiles[RIGHT].image, url: "tiles/right.png" },
      { var: tiles[DOWN].image, url: "tiles/down.png" },
      { var: tiles[LEFT].image, url: "tiles/left.png" },
    ],
    draw
  );
}

function draw() {
  for (let i = 0; i < grid.length; i++) {
    collapse();
    calculateEntropy();
  }
}

function loadAssets(assets, callback) {
  let num_assets = assets.length;
  let loaded = function () {
    num_assets -= 1;
    if (num_assets === 0) {
      callback();
    }
  };
  for (let asset of assets) {
    let element = asset.var;
    if (element instanceof HTMLImageElement) {
      element.addEventListener("load", loaded, false);
    } else if (element instanceof HTMLAudioElement) {
      element.addEventListener("canplaythrough", loaded, false);
    }
    element.src = asset.url;
  }
}

export function choice(array) {
  let random_index = Math.floor(Math.random() * array.length);
  return random_index;
}
