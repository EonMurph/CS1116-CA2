import { createPlayer } from "./js_modules/characters.js";
import { Enemy } from "./js_modules/enemies.js";
import { aim } from "./js_modules/shooting.js";
import { rotate_sprite } from "./js_modules/misc.js";

let enemies = [];
const enemyImage = new Image();
// Enemy(height, width, x, y, xSpeed, ySpeed, image, fireRate, damage)
const enemy1 = new Enemy(64, 64, 640, 300, 5, 5, enemyImage, 10, 10);
const enemy2 = new Enemy(64, 64, 640, 700, 8, 8, enemyImage, 10, 10);
const enemy3 = new Enemy(64, 64, 850, 512, 2, 2, enemyImage, 10, 10);
const enemy4 = new Enemy(64, 64, 450, 512, 2, 2, enemyImage, 10, 10);
enemies.push(enemy1, enemy2, enemy3, enemy4);

const playerImage = new Image();
const player = createPlayer(64, 64, 1280 / 2, 1024 / 2, 20, 25, playerImage);
const playerKeys = ["w", "s", "d", "a"];

export let canvas;
export let context;

let fpsInterval = 1000 / 30; // the denominator is frames-per-second
let now;
let then = Date.now();

export const background = {
  tilesPerRow: 2,
  numCols: 20,
  numRows: 16,
  tileSize: 64,
  backgroundImage: new Image(),
};
// prettier-ignore
background.map = [
  [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
  [2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1],
  [3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2],
  [4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3],
  [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
  [2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1],
  [3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2],
  [4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3],
  [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
  [2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1],
  [3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2],
  [4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3],
  [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
  [2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1],
  [3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2],
  [4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3]
];
// background.map = [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
//   [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1],
//   [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1],
//   [1, 2, 3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 3, 2, 1],
//   [1, 2, 3, 4, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 4, 3, 2, 1],
//   [1, 2, 3, 4, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 4, 3, 2, 1],
//   [1, 2, 3, 4, 1, 2, 3, 4, 4, 4, 4, 4, 4, 3, 2, 1, 4, 3, 2, 1],
//   [1, 2, 3, 4, 1, 2, 3, 4, 4, 4, 4, 4, 4, 3, 2, 1, 4, 3, 2, 1],
//   [1, 2, 3, 4, 1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1, 4, 3, 2, 1],
//   [1, 2, 3, 4, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 4, 3, 2, 1],
//   [1, 2, 3, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 3, 2, 1],
//   [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 2, 1],
//   [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 1],
//   [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// ]

document.addEventListener("DOMContentLoaded", init, false);

function init() {
  canvas = document.querySelector("canvas");
  context = canvas.getContext("2d");

  window.addEventListener("keydown", keyDown, false);
  window.addEventListener("keyup", keyUp, false);

  load_assets(
    [
      { var: background.backgroundImage, url: "images/tester_tilemap.png" },
      { var: enemyImage, url: "images/monsters/transparent/Icon5.png" },
      { var: playerImage, url: "images/monsters/transparent/Icon6.png" },
    ],
    draw
  );
}

function draw() {
  window.requestAnimationFrame(draw);
  let now = Date.now();
  let elapsed = now - then;
  if (elapsed <= fpsInterval) {
    return;
  }
  then = now - (elapsed % fpsInterval);

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let r = 0; r < background.numRows; r += 1) {
    for (let c = 0; c < background.numCols; c += 1) {
      let tile = background.map[r][c];
      if (tile >= 0) {
        let tileRow = Math.floor(tile / background.tilesPerRow);
        let tileCol = Math.floor(tile % background.tilesPerRow);
        context.drawImage(
          background.backgroundImage,
          tileCol * background.tileSize,
          tileRow * background.tileSize,
          background.tileSize,
          background.tileSize,
          c * background.tileSize,
          r * background.tileSize,
          background.tileSize,
          background.tileSize
        );
      }
    }
  }

  rotate_sprite(player, 0);

  for (let enemy of enemies) {
    let angle = aim(enemy.x, enemy.y, player.x, player.y);
    rotate_sprite(enemy, angle);
  }

  player.move();
}

function keyDown(event) {
  let key = event.key;
  if (playerKeys.includes(key)) {
    player.keyDown(key);
  }
}
function keyUp(event) {
  let key = event.key;
  if (playerKeys.includes(key)) {
    player.keyUp(key);
  }
}

function out_of_bounds(object) {
  if (object.x < 0 || object.x + object.width > canvas.width) {
    return [true, "x"];
  } else if (object.y < 0 || object.y + object.height > canvas.height) {
    return [true, "y"];
  }

  return [false];
}

function load_assets(assets, callback) {
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
