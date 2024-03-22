import { Player } from "./characters.js";
import { Enemy } from "./enemies.js";

let enemies = [];
const enemyImage = new Image();
const enemy1 = new Enemy(64, 64, 1000, 200, 5, 5, enemyImage, 10, 10);
const enemy2 = new Enemy(64, 64, 15, 800, 8, 8, enemyImage, 10, 10);
const enemy3 = new Enemy(64, 64, 900, 200, 2, 2, enemyImage, 10, 10);
enemies.push(enemy1, enemy2, enemy3);

const playerImage = new Image();
const player = new Player(64, 64, 1280 / 2, 1024 / 2, 20, 25, playerImage);

export let canvas;
export let context;

let fpsInterval = 1000 / 30; // the denominator is frames-per-second
let now;
let then = Date.now();

let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;

// prettier-ignore
export const background = [
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
const backgroundImage = new Image();
const tilesPerRow = 2;
const numCols = 20;
const numRows = 16;
const tileSize = 64;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
  canvas = document.querySelector("canvas");
  context = canvas.getContext("2d");

  window.addEventListener("keydown", key_down, false);
  window.addEventListener("keyup", key_up, false);

  load_assets(
    [
      { var: backgroundImage, url: "images/tester_tilemap.png" },
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

  for (let r = 0; r < numRows; r += 1) {
    for (let c = 0; c < numCols; c += 1) {
      let tile = background[r][c];
      if (tile >= 0) {
        let tileRow = Math.floor(tile / tilesPerRow);
        let tileCol = Math.floor(tile % tilesPerRow);
        context.drawImage(
          backgroundImage,
          tileCol * tileSize,
          tileRow * tileSize,
          tileSize,
          tileSize,
          c * tileSize,
          r * tileSize,
          tileSize,
          tileSize
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
  context.drawImage(player.image, player.x, player.y, player.width, player.height)
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

function key_down(event) {
  let key = event.key;
  if (key === "w") {
    player.moveUp = true;
  }
  if (key === "s") {
    player.moveDown = true;
  }
  if (key === "a") {
    player.moveLeft = true;
  }
  if (key === "d") {
    player.moveRight = true;
  }
}
function key_up(event) {
  let key = event.key;
  if (key === "w") {
    player.moveUp = false;
  }
  if (key === "s") {
    player.moveDown = false;
  }
  if (key === "a") {
    player.moveLeft = false;
  }
  if (key === "d") {
    player.moveRight = false;
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
