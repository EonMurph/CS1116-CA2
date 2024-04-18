import { rotate_sprite } from "./draw_funcs.js";
import { bullets, context } from "../game.js";

export function aim(character, target) {
  let xDistance = target.x - character.x;
  let yDistance = target.y - character.y;
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
  let charX = character.x + character.boundaryBox.xOffset;
  let charY = character.y + character.boundaryBox.yOffset;

  if (character.framesTilNextShot > 0) {
    character.framesTilNextShot -= 1;
  }
  if (character.framesTilNextShot === 0) {
    character.framesTilNextShot = character.fireRate;
    let bullet = {
      y: charY + character.boundaryBox.height / 2,
      speed: 4,
      radius: 4,
      angle: angle,
      owner: character.name,
      fireRate: character.fireRate,
    };
    if (character.yFrame === 0) {
      bullet.x = charX;
    } else if (character.yFrame === 1) {
      bullet.x = charX + character.boundaryBox.width;
    } else if (character.yFrame === 2 || character.yFrame === 3) {
      bullet.x = charX + character.boundaryBox.width / 2;
    }
    bullets.push(bullet);
  }
}

export function moveBullets(bullets) {
  for (let bullet of bullets) {
    bullet.x += bullet.speed * Math.cos(bullet.angle);
    bullet.y += bullet.speed * Math.sin(bullet.angle);
    rotate_sprite(bullet, bullet.angle);
  }
}

export function drawBullets(bullets) {
  for (let bullet of bullets) {
    if (bullet.owner === "Enemy") {
      context.fillStyle = "red";
    } else {
      context.fillStyle = "yellow";
    }
    context.beginPath();
    context.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  }
}
