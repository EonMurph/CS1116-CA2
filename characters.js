export class Character {
  constructor(height, width, x, y, xSpeed, ySpeed, /* image */) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    // this.image = image
  }

  distance_to_player(player_x, player_y) {
    this.x_distance = this.x - player_x;
    this.y_distance = this.y - player_y;
    return [this.x_distance, this.y_distance];
  }
}
