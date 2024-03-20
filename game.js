let canvas;
let context;

let fpsInterval = 1000 / 30; // the denominator is frames-per-second
let now;
let then = Date.now();

let player = {
  x: 1280 / 2,
  y: 1024 / 2,
  height: 64,
  width: 25,
  xChange: 10,
  yChange: 25,
};
let y_boundary = 0.1;
let x_boundary = 0.1;

let moveUp = false;
let moveDown = false;
let moveLeft = false;
let moveRight = false;

// prettier-ignore
let background = [
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
let backgroundImage = new Image();
let tilesPerRow = 2;
let num_cols = 20;
let num_rows = 16;
let tileSize = 64;

document.addEventListener("DOMContentLoaded", init, false);

function init() {
  canvas = document.querySelector("canvas");
  context = canvas.getContext("2d");

  window.addEventListener("keydown", key_down, false);
  window.addEventListener("keyup", key_up, false);

  load_assets([{ var: backgroundImage, url: "images/tester_tilemap.png" }]);
  draw();
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

  for (let r = 0; r < num_rows; r += 1) {
    for (let c = 0; c < num_cols; c += 1) {
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

  context.fillStyle = "yellow";
  context.fillRect(player.x, player.y, player.width, player.height);

  if (moveUp) {
    if (player.y > canvas.height * y_boundary) {
      player.y -= player.yChange;
    } else {
      background.unshift(background.pop());
    }
  }
  if (moveDown) {
    if (player.y + player.height < canvas.height * (1 - y_boundary)) {
      player.y += player.yChange;
    } else {
      background.push(background.shift());
    }
  }
  if (moveLeft) {
    if (player.x > canvas.width * x_boundary) {
      player.x -= player.width;
    } else {
      for (let i = 0; i < num_rows; i += 1) {
        background[i].unshift(background[i].pop());
      }
    }
  }
  if (moveRight) {
    if (player.x + player.width < canvas.width * (1 - x_boundary)) {
      player.x += player.width;
    } else {
      for (let i = 0; i < num_rows; i += 1) {
        background[i].push(background[i].shift());
      }
    }
  }
  // let out_of_bounds_data = out_of_bounds(player)
  // if (out_of_bounds_data[0]) {
  //   if (out_of_bounds_data[1] === "x") {
  //     player.x
  //   }
  // }
}

function key_down(event) {
  let key = event.key;
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
function key_up(event) {
  let key = event.key;
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

function out_of_bounds(object) {
  if (object.x < 0 || object.x + object.width > canvas.width) {
    return [true, "x"];
  } else if (object.y < 0 || object.y + object.height > canvas.height) {
    return [true, "y"];
  }

  return [false];
}

function load_assets(assets, callback) {
  let num_assets = assets.lenght;
  let loaded = function () {
    console.log("loaded");
    num_assets -= 1;
    if (num_assets === 0) {
      callback();
    }
  };
  for (let asset of assets) {
    let element = asset.var;
    if (element instanceof HTMLImageElement) {
      console.log("img");
      element.addEventListener("load", loaded, false);
    } else if (element instanceof HTMLAudioElement) {
      console.log("audio");
      element.addEventListener("canplaythrough", loaded, false);
    }
    element.src = asset.url;
  }
}
