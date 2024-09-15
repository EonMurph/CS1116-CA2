import { context, canvas } from "../game.js";

export function drawBackground(background, player) {
  const height = canvas.height / background.tileSize;
  const width = canvas.width / background.tileSize;
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let cIndex = c + player.deltaC;
      let rIndex = r + player.deltaR;
      try {
        context.drawImage(
          background.tiles.tiles[background.map[rIndex][cIndex]].image,
          c * background.tileSize,
          r * background.tileSize,
        );
      } catch (error) { }
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
