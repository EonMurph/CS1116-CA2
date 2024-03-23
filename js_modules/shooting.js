export function aim(character_x, character_y, target_x, target_y) {
  let xDistance = target_x - character_x;
  let yDistance = target_y - character_y;
  return Math.atan2(yDistance, xDistance);
}

export function closestEnemy(player, enemies) {
  let shortestDistance = 10000;
  let nearestEnemy;
  for (let enemy of enemies) {
    let distance = Math.sqrt(
      (enemy.x - player.x) ** 2 + (enemy.y - player.y) ** 2
    );
    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestEnemy = enemy;
    }
  }
  return nearestEnemy;
}
