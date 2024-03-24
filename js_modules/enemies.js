export class Enemy {
  constructor(height, width, x, y, xSpeed, ySpeed, image, fireRate, damage) {
    this.name = "Enemy";
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.image = image;
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
        this.x += this.xSpeed;
      } else if (distance.x > 0) {
        this.x -= this.xSpeed;
      }
    }
    if (Math.abs(distance.y) > 20) {
      if (distance.y < 0) {
        this.y += this.ySpeed;
      } else if (distance.y > 0) {
        this.y -= this.ySpeed;
      }
    }
  }
}
