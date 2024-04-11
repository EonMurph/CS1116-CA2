import { createPlayer } from "./js_modules/characters.js";
import { Enemy } from "./js_modules/enemies.js";
import { aim, closestEnemy, fire, moveBullets } from "./js_modules/shooting.js";
import { background } from "./js_modules/background.js";
import {
  rotate_sprite,
  drawBackground,
  drawSprite,
} from "./js_modules/draw_funcs.js";

let enemies = [];
export let bullets = [];
const enemyImage = new Image();
// Enemy(height, width, x, y, speed, image, bpm, damage)
const enemy1 = new Enemy(32, 32, 320, 125, 5, enemyImage, 15, 10);
enemies.push(enemy1);
// const enemy2 = new Enemy(32, 32, 320, 350, 8, enemyImage, 306, 10);
// const enemy3 = new Enemy(32, 32, 450, 256, 2, enemyImage, 45, 10);
// const enemy4 = new Enemy(32, 32, 172, 256, 2, enemyImage, 60, 10);
// enemies.push(enemy1, enemy2, enemy3, enemy4);

const playerImage = new Image();
export const player = createPlayer(32, 32, 640 / 2, 512 / 2, 20, playerImage);
const playerKeys = ["w", "s", "d", "a"];

export let canvas;
export let context;

let fpsInterval = 1000 / 30; // the denominator is frames-per-second
let now;
let then = Date.now();

let second;
let lastSecond;

// export const background = {
//   tilesPerRow: 2,
//   numCols: 20,
//   numRows: 16,
//   tileSize: 64,
//   backgroundImage: new Image(),
// };
// prettier-ignore
// background.map = [
//   [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
//   [2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1],
//   [3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2],
//   [4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3],
//   [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
//   [2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1],
//   [3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2],
//   [4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3],
//   [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
//   [2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1],
//   [3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2],
//   [4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3],
//   [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
//   [2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1],
//   [3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2],
//   [4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3]
// ];
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

  let assets = [
    { var: player.image, url: "images/sprites/chef.png" },
  ];
  for (let i = 0; i < enemies.length; i++) {
    assets.push({
      var: enemies[i].image,
      url: "images/sprites/chef.png"
    })
  }
  for (let i = 0; i < background.tiles.tiles.length; i++) {
    assets.push({
      var: background.tiles.tiles[i].image,
      url: "images/tiles/" + background.tiles.tiles[i].tile + ".png",
    });
  }
  load_assets(assets, draw);
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

  drawBackground(background);

  let nearestEnemy = closestEnemy(player, enemies);
  let angle = aim(player.x, player.y, nearestEnemy.x, nearestEnemy.y);
  let angleDegrees = angle * (180 / Math.PI);
  // rotate_sprite(player, angle);
  drawSprite(player, angle);
  second = new Date().getSeconds();
  if (second !== lastSecond) {
    fire(player, angle, second);
  }

  for (let enemy of enemies) {
    let angle = aim(enemy.x, enemy.y, player.x, player.y);
    // enemy.move(player.x, player.y)
    // rotate_sprite(enemy, angle);
    drawSprite(enemy, angle);
    if (second !== lastSecond) {
      fire(enemy, angle, second);
    }
  }
  lastSecond = second;

  // moveBullets(bullets);
  player.move();

  for (let bullet of bullets) {
    if (out_of_bounds(bullet)[0]) {
      let index = bullets.indexOf(bullet);
      bullets.splice(index, 1);
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
