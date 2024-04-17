import { canvas } from "../game.js";
import { background } from "./background.js";

export function createPlayer(height, width, speed, image) {
  const player = { name: "Player", height, width, speed, image };
  const y_boundary = 0.15;
  const x_boundary = 0.15;
  let moveUp = false;
  let moveDown = false;
  let moveLeft = false;
  let moveRight = false;
  player.fireRate = 30; // testing purposes, will be later added to specific guns
  player.framesTilNextShot = 0;
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
      player.xFrame = (player.xFrame + 1) % 3;
    }

    const mapLength = background.map.length;
    const canvasRows = canvas.height / background.tileSize;
    const canvasCols = canvas.width / background.tileSize;
    if (player.deltaR < 0) {
      player.deltaR = 0;
    } else if (player.deltaR > mapLength - canvasRows) {
      player.deltaR = mapLength - canvasRows;
    }
    if (player.deltaC < 0) {
      player.deltaC = 0;
    } else if (player.deltaC > mapLength - canvasCols) {
      player.deltaC = mapLength - canvasCols;
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
