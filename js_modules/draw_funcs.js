import { context, canvas, player } from "../game.js";

// code for rotating a sprite found on stackoverflow
// https://stackoverflow.com/a/11985464
export function rotate_sprite(sprite, angle) {
  context.save();

  context.translate(sprite.x + sprite.width / 2, sprite.y + sprite.height / 2);
  context.rotate(angle);

  if (sprite.image) {
    context.drawImage(
      sprite.image,
      (sprite.width / 2) * -1,
      (sprite.height / 2) * -1,
      sprite.width,
      sprite.height
    );
  } else {
    if (sprite.owner === "Enemy") {
      context.fillStyle = "red";
    } else {
      context.fillStyle = "yellow";
    }
    context.fillRect(
      (sprite.width / 2) * -1,
      (sprite.height / 2) * -1,
      sprite.width,
      sprite.height
    );
  }

  context.restore();
}

// export function drawBackground(background) {
//   for (let r = 0; r < background.numRows; r += 1) {
//     for (let c = 0; c < background.numCols; c += 1) {
//       let tile = background.map[r][c];
//       if (tile >= 0) {
//         let tileRow = Math.floor(tile / background.tilesPerRow);
//         let tileCol = Math.floor(tile % background.tilesPerRow);
//         context.drawImage(
//           background.backgroundImage,
//           tileCol * background.tileSize,
//           tileRow * background.tileSize,
//           background.tileSize,
//           background.tileSize,
//           c * background.tileSize,
//           r * background.tileSize,
//           background.tileSize,
//           background.tileSize
//         );
//       }
//     }
//   }
// }
export function drawBackground(background) {
  const height = canvas.height / background.tileSize;
  const width = canvas.width / background.tileSize;
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let cIndex = c + player.deltaC;
      let rIndex = r + player.deltaR;
      context.drawImage(
        background.tiles.tiles[background.map[rIndex][cIndex]].image,
        c * background.tileSize,
        r * background.tileSize,
      );
    }
  }
}

export function drawSprite(sprite, angle) {
  let angleDegrees = angle * (180 / Math.PI);

  if (angleDegrees > 45 && angleDegrees < 135) {
    sprite.yFrame = 0;
  } else if (angleDegrees < 45 && angleDegrees > -45) {
    sprite.yFrame = 1;
  } else if (angleDegrees < -45 && angleDegrees > -135) {
    sprite.yFrame = 3;
  } else {
    sprite.yFrame = 2;
  }
  context.drawImage(
    sprite.image,
    sprite.xFrame * sprite.width,
    sprite.yFrame * sprite.height,
    sprite.width,
    sprite.height,
    sprite.x,
    sprite.y,
    sprite.width,
    sprite.height
  );
}
