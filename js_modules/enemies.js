const enemyImage = { var: new Image(), url: "images/sprites/guy.png" };
export const enemyVariants = [enemyImage];
export class Enemy {
  constructor(height, width, x, y, speed, fireRate) {
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
    this.framesTilNextShot = 120;
    this.health = 10;
    this.invincibilityFrames = 0;
    this.boundaryBox = {
      width: 16,
      height: 24,
      xOffset: 0,
      yOffset: 0,
    };
  }

  distance_to_player(player) {
    this.x_distance = this.x - player.x;
    this.y_distance = this.y - player.y;
    return { x: this.x_distance, y: this.y_distance };
  }

  move(player) {
    let distance = this.distance_to_player(player);
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
