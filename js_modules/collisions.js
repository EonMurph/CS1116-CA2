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
