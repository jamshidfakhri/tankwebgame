import Phaser from 'phaser';
import { ENEMY } from '../config';

export default class Enemy extends Phaser.Physics.Arcade.Image {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'enemy');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setVelocityY(ENEMY.speedY);
  }

  update() {
    if (this.y > 900) this.destroy();
  }
}