export class Enemy {
  constructor(height, width, x, y, speed, image, fireRate, damage) {
    this.name = "Enemy";
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.image = image;
    this.xFrame = 0;
    this.yFrame = 0;
    this.fireRate = fireRate;
    this.damage = damage;
  }

  distance_to_player(player_x, player_y) {
    this.x_distance = this.x - player_x;
    this.y_distance = this.y - player_y;
    return { x: this.x_distance, y: this.y_distance };
  }
  
  move(player_x, player_y) {
    let distance = this.distance_to_player(player_x, player_y);
    if (Math.abs(distance.x) > 15) {
      if (distance.x < 0) {
        this.x += this.speed;
      } else if (distance.x > 0) {
        this.x -= this.speed;
      }
    }
    if (Math.abs(distance.y) > 20) {
      if (distance.y < 0) {
        this.y += this.speed;
      } else if (distance.y > 0) {
        this.y -= this.speed;
      }
    }
  }
}
