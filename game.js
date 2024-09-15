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

const player = createPlayer(32, 32, 6, new Image(), new Image());
const playerKeys = ["w", "a", "s", "d"];

export let canvas;
export let context;
let scoreDisplay;
let healthDisplay;

let fpsInterval = 1000 / 30; // the denominator is frames-per-second
let now;
let then = Date.now();

let drawRequestId;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
  canvas = document.querySelector("canvas");
  context = canvas.getContext("2d");
  scoreDisplay = document.querySelector("#score");
  healthDisplay = document.querySelector("#health")

  window.addEventListener("keydown", keyDown, false);
  window.addEventListener("keyup", keyUp, false);

  player.x = Math.floor(canvas.width / 3);
  player.y = Math.floor(canvas.height / 3);

  let assets = [
    { var: player.normalImage, url: "images/sprites/chef.png" },
    { var: player.hurtImage, url: "images/sprites/hurtChef.png" },
  ];
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


function draw() {
  drawRequestId = window.requestAnimationFrame(draw);
  now = Date.now();
  let elapsed = now - then;
  if (elapsed <= fpsInterval) {
    return;
  }
  then = now - (elapsed % fpsInterval);

  player.move();
  // for (let enemy of enemies) {
  //   enemy.move(player);
  // }

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
          player.score++;
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
    fire(enemy, angle);
    drawSprite(enemy, angle);
  }
  drawBullets(bullets);

  scoreDisplay.innerHTML = player.score;
  healthDisplay.innerHTML = player.health;
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

  let outcomeElement = document.querySelector("#game-over");
  outcomeElement.innerHTML = "Game Over!";
}

function nextRoom() {
  //* Enemy(height, width, x, y, speed, bpm, damage)
  for (let i = 0; i < 5; i++) {
    enemies.push(
      new Enemy(24, 16, randint(35, 280), randint(35, 206), 4, 15, 10)
    );
  }
  for (let enemy of enemies) {
    if (spriteCollision(player, enemy).collides) {
      enemies = enemies.filter((value) => value !== enemy);
    }
  }
}

function randint(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}
