import { canvas } from "../game.js";
import { background } from "./background.js";

export function createPlayer(height, width, x, y, speed, image) {
  const player = { name: "Player", height, width, x, y, speed, image };
  const y_boundary = 0.15;
  const x_boundary = 0.15;
  let moveUp = false;
  let moveDown = false;
  let moveLeft = false;
  let moveRight = false;
  player.fireRate = 100; // testing purposes, will be later added to specific guns
  player.xFrame = 0;
  player.yFrame = 0;
  player.deltaC = 0;
  player.deltaR = 0;

  player.move = () => {
    if (moveUp) {
      if (player.y > canvas.height * y_boundary) {
        player.y -= player.speed;
      } else {
        player.deltaR--;
      }
    }
    if (moveDown) {
      if (player.y + player.height < canvas.height * (1 - y_boundary)) {
        player.y += player.speed;
      } else {
        player.deltaR++;
      }
    }

    if (moveLeft) {
      if (player.x > canvas.width * x_boundary) {
        player.x -= player.speed;
      } else {
        player.deltaC--;
      }
    }
    if (moveRight) {
      if (player.x + player.width < canvas.width * (1 - x_boundary)) {
        player.x += player.speed;
      } else {
        player.deltaC++;
      }
    }

    if (moveUp || moveDown || moveRight || moveLeft) {
      player.xFrame = (player.xFrame + 1) % 4;
    }

    const mapLength = background.map.length;
    const canvasHeight = canvas.height / 64;
    const canvasWidth = canvas.width / 64;
    if (player.deltaR < 0) {
      player.deltaR = 0;
    } else if (player.deltaR > mapLength - canvasHeight) {
      player.deltaR = mapLength - canvasHeight;
    }
    if (player.deltaC < 0) {
      player.deltaC = 0;
    } else if (player.deltaC > mapLength - canvasWidth) {
      player.deltaC = mapLength - canvasWidth;
    }
  };

  player.keyDown = (key) => {
    if (key === "w") {
      moveUp = true;
    }
    if (key === "s") {
      moveDown = true;
    }

    if (key === "a") {
      moveLeft = true;
    }
    if (key === "d") {
      moveRight = true;
    }
  };
  player.keyUp = (key) => {
    if (key === "w") {
      moveUp = false;
    }
    if (key === "s") {
      moveDown = false;
    }

    if (key === "a") {
      moveLeft = false;
    }
    if (key === "d") {
      moveRight = false;
    }
  };

  return player;
}
