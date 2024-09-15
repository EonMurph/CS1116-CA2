import { canvas } from "../game.js";
import { background } from "./background.js";

export default function createPlayer(
  height,
  width,
  speed,
  normalImage,
  hurtImage
) {
  const player = {
    name: "Player",
    height,
    width,
    speed,
    normalImage,
    hurtImage,
  };
  player.image = player.normalImage;
  player.health = 5;
  player.score = 0;
  const y_boundary = 0.1;
  const x_boundary = 0.05;
  let moveUp = false;
  let moveDown = false;
  let moveLeft = false;
  let moveRight = false;
  player.fireRate = 30;
  player.framesTilNextShot = 120;
  player.invincibilityFrames = 60;
  player.xFrame = 0;
  player.yFrame = 0;
  player.deltaC = 0;
  player.deltaR = 0;
  player.boundaryBox = {
    width: 15,
    height: 30,
    xOffset: 8,
    yOffset: 1,
  };

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

  player.dealDamage = (collision) => {
    if (collision.collides && player.invincibilityFrames === 0) {
      player.invincibilityFrames = 60;
      player.health--;
      player.image = player.hurtImage;
    }
    if (player.invincibilityFrames > 0) {
      player.invincibilityFrames--;
      if (player.invincibilityFrames === 0) {
        player.image = player.normalImage;
      }
    }
  };

  return player;
}

