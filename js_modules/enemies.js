const enemyImage = { var: new Image(), url: "images/sprites/chef.png" };
export const enemyVariants = [enemyImage];
export class Enemy {
  constructor(height, width, x, y, speed, fireRate, damage) {
    this.name = "Enemy";
    this.image = enemyImage.var;
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.minDistance = 90;
    this.xFrame = 0;
    this.yFrame = 0;
    this.fireRate = Math.round(1800 / fireRate);
    this.damage = damage;
    this.health = 10;
    this.invincibilityFrames = 0;
    this.boundaryBox = {
      width: 15,
      height: 30,
      xOffset: 4,
      yOffset: 1,
    };
  }

  distance_to_player(player_x, player_y) {
    this.x_distance = this.x - player_x;
    this.y_distance = this.y - player_y;
    return { x: this.x_distance, y: this.y_distance };
  }

  move(player) {
    let distance = this.distance_to_player(player.x, player.y);
    if (Math.abs(distance.x) > this.minDistance) {
      if (distance.x < 0) {
        this.x += this.speed;
      } else if (distance.x > 0) {
        this.x -= this.speed;
      }
    }
    if (Math.abs(distance.y) > this.minDistance) {
      if (distance.y < 0) {
        this.y += this.speed;
      } else if (distance.y > 0) {
        this.y -= this.speed;
      }
    }
  }

  dealDamage(collision) {
    if (collision.collides && this.invincibilityFrames === 0) {
      this.invincibilityFrames = 30;
      this.health--;
    }
    if (this.invincibilityFrames > 0) {
      this.invincibilityFrames--;
    }
  }
}
