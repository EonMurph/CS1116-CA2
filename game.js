import { createPlayer } from "./characters.js";
import { Enemy } from "./enemies.js";

let enemies = [];
const enemyImage = new Image();
const enemy1 = new Enemy(64, 64, 1000, 200, 5, 5, enemyImage, 10, 10);
const enemy2 = new Enemy(64, 64, 15, 800, 8, 8, enemyImage, 10, 10);
const enemy3 = new Enemy(64, 64, 900, 200, 2, 2, enemyImage, 10, 10);
enemies.push(enemy1, enemy2, enemy3);

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

  // context.fillStyle = "yellow";
  // context.fillRect(player.x, player.y, player.width, player.height);
  // context.fillStyle = "red";
  // for (let enemy of enemies) {
  //   context.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  // }
  context.drawImage(
    player.image,
    player.x,
    player.y,
    player.width,
    player.height
  );
  for (let enemy of enemies) {
    context.drawImage(enemy.image, enemy.x, enemy.y, enemy.width, enemy.height);
  }

  player.move();

  for (let enemy of enemies) {
    let distance = enemy.distance_to_player(player.x, player.y);
    if (Math.abs(distance[0]) > 15) {
      if (distance[0] < 0) {
        enemy.x += enemy.xSpeed;
      } else if (distance[0] > 0) {
        enemy.x -= enemy.xSpeed;
      }
    }
    if (Math.abs(distance[1]) > 20) {
      if (distance[1] < 0) {
        enemy.y += enemy.ySpeed;
      } else if (distance[1] > 0) {
        enemy.y -= enemy.ySpeed;
      }
    }
  }
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
