import { canvas, background } from "./game.js";

export function createPlayer(height, width, x, y, xSpeed, ySpeed, image) {
  const player = { height, width, x, y, xSpeed, ySpeed, image };
  const y_boundary = 0.2;
  const x_boundary = 0.2;
  let moveUp = false;
  let moveDown = false;
  let moveLeft = false;
  let moveRight = false;

  player.move = () => {
    if (moveUp) {
      if (player.y > canvas.height * y_boundary) {
        player.y -= player.ySpeed;
      } else {
        background.map.unshift(background.map.pop());
      }
    }
    if (moveDown) {
      if (player.y + player.height < canvas.height * (1 - y_boundary)) {
        player.y += player.ySpeed;
      } else {
        background.map.push(background.map.shift());
      }
    }

    if (moveLeft) {
      if (player.x > canvas.width * x_boundary) {
        player.x -= player.xSpeed;
      } else {
        for (let i = 0; i < background.numRows; i += 1) {
          background.map[i].unshift(background.map[i].pop());
        }
      }
    }
    if (moveRight) {
      if (player.x + player.width < canvas.width * (1 - x_boundary)) {
        player.x += player.xSpeed;
      } else {
        for (let i = 0; i < background.numRows; i += 1) {
          background.map[i].push(background.map[i].shift());
        }
      }
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
  }
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
  }

  return player;
}
