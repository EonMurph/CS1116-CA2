import { rotate_sprite } from "./misc.js";
import { bullets } from "../game.js";

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

export function fire(character, angle) {
  // context.fillStyle = "yellow";
  // context.fillRect(character.x + character.width, character.y + character.height / 2, 100, 40);
  let bullet = {
    x: character.x,
    y: character.y,
    xSpeed: 5,
    ySpeed: 5,
    width: 40,
    height: 10,
    angle: angle,
    owner: character,
  }
  bullets.push(bullet)
  for (let bullet of bullets) {
    bullet.x += bullet.xSpeed * Math.cos(bullet.angle);
    bullet.y += bullet.ySpeed * Math.sin(bullet.angle);
    rotate_sprite(bullet, bullet.angle);
  }
}
