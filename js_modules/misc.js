import { context } from "../game.js";

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

export function drawBackground(background) {
  for (let r = 0; r < background.numRows; r += 1) {
    for (let c = 0; c < background.numCols; c += 1) {
      let tile = background.map[r][c];
      if (tile >= 0) {
        let tileRow = Math.floor(tile / background.tilesPerRow);
        let tileCol = Math.floor(tile % background.tilesPerRow);
        context.drawImage(
          background.backgroundImage,
          tileCol * background.tileSize,
          tileRow * background.tileSize,
          background.tileSize,
          background.tileSize,
          c * background.tileSize,
          r * background.tileSize,
          background.tileSize,
          background.tileSize
        );
      }
    }
  }
}
