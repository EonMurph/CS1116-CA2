import { Character } from "./characters.js";

export class Enemy extends Character {
  constructor(height, width, x, y, xSpeed, ySpeed, image, fireRate, damage) {
    super(height, width, x, y, xSpeed, ySpeed, image);
    this.fireRate = fireRate;
    this.damage = damage;
  }
  
  distance_to_player(player_x, player_y) {
    this.x_distance = this.x - player_x;
    this.y_distance = this.y - player_y;
    return [this.x_distance, this.y_distance];
  }
}
