import { context } from "../game.js";

// code for rotating a sprite found on stackoverflow
// https://stackoverflow.com/a/11985464
export function rotate_sprite(sprite, angle) {
  context.save();

  context.translate(sprite.x + sprite.width / 2, sprite.y + sprite.height / 2);
  context.rotate(angle);

  context.drawImage(
    sprite.image,
    (sprite.width / 2) * -1,
    (sprite.height / 2) * -1,
    sprite.width,
    sprite.height
  );

  context.restore();
}
// export function undo_rotate_context(sprite, angle) {
//   context.rotate(-angle);
//   context.translate(-sprite.x - sprite.width / 2, -sprite.y - sprite.height / 2);
// }
