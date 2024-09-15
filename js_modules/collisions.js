// export default function spritesCollide(sprite1, sprite2) {
//   let sprite1X = sprite1.x + sprite1.boundaryBox.xOffset;
//   let sprite1Y = sprite1.y + sprite1.boundaryBox.yOffset;
//   let sprite2X = sprite2.x + sprite2.boundaryBox.xOffset;
//   let sprite2Y = sprite2.y + sprite2.boundaryBox.yOffset;

//   if (
//     sprite1X + sprite1.boundaryBox.width < sprite2X ||
//     sprite2X + sprite2.boundaryBox.width < sprite1X ||
//     sprite1Y > sprite2Y + sprite2.boundaryBox.height ||
//     sprite2Y > sprite1Y + sprite1.boundaryBox.height
//   ) {
//     return [false, 0, 0];
//   } else {
//     let dx = sprite1.x - sprite2.x;
//     let dy = sprite1.y - sprite2.y;
//     if (sprite1.boundaryBox.width > dx > 0) {
//       sprite1.x -= 20;
//     } else if (-sprite1.boundaryBox.width < dx < 0) {
//       sprite1.x -= 20;
//     }
//     if (sprite1.boundaryBox.height > dy > 0) {
//       sprite1.y -= 20;
//     } else if (-sprite1.boundaryBox.height < dy < 0) {
//       sprite1.y -= 20;
//     }
//     // sprite1.x += dx * 20;
//     // sprite1.y += dy * 20;
//     console.log(dx, dy);
//     return [true, dx !== 0, dy !== 0];
//   }
// }

export function spriteCollision(collidee, collider) {
  const collision = { collides: false, collidee, collider };
  const collideeX = collidee.x + collidee.boundaryBox.xOffset;
  const collideeY = collidee.y + collidee.boundaryBox.yOffset;
  const objectX = collider.x + collider.boundaryBox.xOffset;
  const objectY = collider.y + collider.boundaryBox.yOffset;

  if (
    collideeX + collidee.boundaryBox.width < objectX ||
    objectX + collider.boundaryBox.width < collideeX ||
    collideeY + collidee.boundaryBox.height < objectY ||
    objectY + collider.boundaryBox.height < collideeY
  ) {
    return collision;
  }

  collision.collides = true;
  return collision;
}

export function bulletCollision(collidee, bullet) {
  const collision = { collides: false, collidee, collider: bullet };

  const collideeX = collidee.x + collidee.boundaryBox.xOffset;
  const collideeY = collidee.y + collidee.boundaryBox.yOffset;
  const bulletX = bullet.x;
  const bulletY = bullet.y;

  let testX = bulletX;
  let testY = bulletY;

  if (bulletX < collideeX) {
    testX = collideeX;
  } else if (bulletX > collideeX + collidee.boundaryBox.width) {
    testX = collideeX + collidee.boundaryBox.width;
  }
  if (bulletY < collideeY) {
    testY = collideeY;
  } else if (bulletY > collideeY + collidee.boundaryBox.height) {
    testY = collideeY + collidee.boundaryBox.height;
  }

  const distX = bulletX - testX;
  const distY = bulletY - testY;
  const distance = Math.sqrt(distX ** 2 + distY ** 2);

  if (distance <= bullet.radius) {
    collision.collides = true;
    return collision;
  }

  return collision;
}
