import Phaser from 'phaser';
import { BULLET } from '../config';

export default class Bullet extends Phaser.Physics.Arcade.Image {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'bullet');
  }

  fire(x: number, y: number) {
    this.enableBody(true, x, y, true, true);
    this.setVelocityY(-BULLET.speed);
  }

  update() {
    if (this.y < -30) this.disableBody(true, true);
  }
}