import createPlayer from "./js_modules/player.js";
import { Enemy, enemyVariants } from "./js_modules/enemies.js";
import {
  aim,
  closestEnemy,
  drawBullets,
  fire,
  moveBullets,
} from "./js_modules/shooting.js";
import { background } from "./js_modules/background.js";
import { drawBackground, drawSprite } from "./js_modules/draw_funcs.js";
import { bulletCollision, spriteCollision } from "./js_modules/collisions.js";

let enemies = [];
export let bullets = [];

const player = createPlayer(32, 32, 6, new Image());
const playerKeys = ["w", "a", "s", "d"];

export let canvas;
export let context;

let fpsInterval = 1000 / 30; // the denominator is frames-per-second
let now;
let then = Date.now();

let drawRequestId;

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

  player.x = Math.floor(canvas.width / 3);
  player.y = Math.floor(canvas.height / 3);

  let assets = [{ var: player.image, url: "images/sprites/chef.png" }];
  for (let variant of enemyVariants) {
    assets.push({
      var: variant.var,
      url: variant.url,
    });
  }
  for (let i = 0; i < background.tiles.tiles.length; i++) {
    assets.push({
      var: background.tiles.tiles[i].image,
      url: "images/tiles/" + background.tiles.tiles[i].tile + ".png",
    });
  }
  load_assets(assets, draw);
}

// function draw() {
//   window.requestAnimationFrame(draw);
//   let now = Date.now();
//   let elapsed = now - then;
//   if (elapsed <= fpsInterval) {
//     return;
//   }
//   then = now - (elapsed % fpsInterval);

//   context.clearRect(0, 0, canvas.width, canvas.height);

//   drawBackground(background, player);

//   let nearestEnemy = closestEnemy(player, enemies);
//   // let [collide, dx, dy] = collides(player, nearestEnemy);
//   // console.log(dx, dy);
//   // if (!collide) {
//   // player.health--;
//   // console.log(player.health);
//   // player.move(dx, dy);
//   // }
//   player.move();
//   let collides = spritesCollide(player, nearestEnemy);

//   // spritesCollide(player, nearestEnemy);
//   let angle = aim(player.x, player.y, nearestEnemy.x, nearestEnemy.y);
//   // rotate_sprite(player, angle);
//   drawSprite(player, angle);
//   // second = new Date().getSeconds();
//   // if (second !== lastSecond) {
//   // fire(player, angle, second);
//   // }
//   lastSecond = seconds(lastSecond, fire, player, angle);

//   for (let enemy of enemies) {
//     angle = aim(enemy.x, enemy.y, player.x, player.y);
//     // enemy.move(player.x, player.y)
//     // rotate_sprite(enemy, angle);
//     drawSprite(enemy, angle);
//     //   if (second !== lastSecond) {
//     //     fire(enemy, angle, second);
//     //   }
//   }
//   // lastSecond = second;

//   moveBullets(bullets);
//   // player.move();

//   for (let bullet of bullets) {
//     if (out_of_bounds(bullet)[0]) {
//       let index = bullets.indexOf(bullet);
//       bullets.splice(index, 1);
//     }
//   }
// }

function draw() {
  drawRequestId = window.requestAnimationFrame(draw);
  now = Date.now();
  let elapsed = now - then;
  if (elapsed <= fpsInterval) {
    return;
  }
  then = now - (elapsed % fpsInterval);

  player.move();
  for (let enemy of enemies) {
    enemy.move(player);
  }

  if (enemies.length === 0) {
    nextRoom();
  }

  let nearestEnemy = closestEnemy(player, enemies);
  let angle = aim(player, nearestEnemy);

  fire(player, angle);
  moveBullets(bullets);
  for (let bullet of bullets) {
    if (out_of_bounds(bullet)[0]) {
      bullets = bullets.filter((value) => value !== bullet);
    }
  }

  player.dealDamage(spriteCollision(player, nearestEnemy));
  for (let bullet of bullets) {
    if (bullet.owner === "Enemy") {
      player.dealDamage(bulletCollision(player, bullet));
    } else if (bullet.owner === "Player") {
      for (let enemy of enemies) {
        enemy.dealDamage(bulletCollision(enemy, bullet));
        if (enemy.health === 0) {
          enemies = enemies.filter((value) => value !== enemy);
        }
      }
    }
  }
  if (player.health === 0) {
    gameOver();
  }

  context.clearRect(0, 0, canvas.width, canvas.height);

  drawBackground(background, player);

  drawSprite(player, angle);

  for (let enemy of enemies) {
    angle = aim(enemy, player);
    drawSprite(enemy, angle);
  }
  drawBullets(bullets);
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
function gameOver() {
  window.removeEventListener("keydown", keyDown, false);
  window.removeEventListener("keyup", keyUp, false);
  window.cancelAnimationFrame(drawRequestId);
}

function nextRoom() {
  //* Enemy(height, width, x, y, speed, bpm, damage)
  enemies.push(new Enemy(32, 32, 10, 70, 5, 15, 10));
  console.log("next round");
}
