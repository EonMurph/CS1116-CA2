import { Character } from "./characters.js";

export class Enemy extends Character {
  constructor(height, width, x, y, xSpeed, ySpeed, image, fireRate, damage) {
    super(height, width, x, y, xSpeed, ySpeed, image);
    this.fireRate = fireRate;
    this.damage = damage;
  }
}
