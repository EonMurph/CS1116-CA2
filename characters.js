import { canvas, background } from "./game.js";
export class Character {
  constructor(height, width, x, y, xSpeed, ySpeed, image) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.image = image;
    this.moveUp = false;
    this.moveDown = false;
    this.moveLeft = false;
    this.moveRight = false;
  }
}

export class Player extends Character {
  constructor(height, width, x, y, xSpeed, ySpeed, image) {
    super(height, width, x, y, xSpeed, ySpeed, image);

    this.y_boundary = 0.2;
    this.x_boundary = 0.2;
  }
  
  move() {
    if (this.moveUp) {
      if (this.y > canvas.height * this.y_boundary) {
        this.y -= this.ySpeed;
      } else {
        background.unshift(background.pop())
      }
    }
    if (this.moveDown) {
      if (this.y + this.height < canvas.height * (1 - this.y_boundary)) {
        this.y += this.ySpeed;
      } else {
        background.push(background.shift());
      }
    }
    
    if (this.moveLeft) {
      if (this.x > canvas.width * this.x_boundary) {
        this.x -= this.xSpeed;
      } else {
        for (let i = 0; i < numRows; i += 1) {
          background[i].unshift(background[i].pop());
        }
      }
    }
    if (this.moveRight) {
      if (this.x + this.width < canvas.width * (1- this.x_boundary)) {
        this.x += this.xSpeed;
      } else {
        for (let i = 0; i < numRows; i += 1) {
          background[i].push(background[i].shift());
        }
      }
    }
  }
}
