import Phaser from 'phaser';
import { TANK, BULLET, ENEMY } from '../config';

export default class BootScene extends Phaser.Scene {
  constructor() { super('Boot'); }

  create() {
    this.makeTank();
    this.makeBullet();
    this.makeEnemy();
    this.scene.start('Menu');
  }

  private makeTank() {
    const g = this.add.graphics();
    g.fillStyle(0x3fb950, 1);
    g.fillRect(0, TANK.height * 0.5, TANK.width, TANK.height * 0.5);
    g.fillRect(TANK.width / 2 - 3, 0, 6, TANK.height * 0.5);
    g.generateTexture('tank', TANK.width, TANK.height);
    g.destroy();
  }

  private makeBullet() {
    const g = this.add.graphics();
    g.fillStyle(0xffd33d, 1);
    g.fillRect(0, 0, BULLET.width, BULLET.height);
    g.generateTexture('bullet', BULLET.width, BULLET.height);
    g.destroy();
  }

  private makeEnemy() {
    const g = this.add.graphics();
    g.fillStyle(0xf85149, 1);
    g.fillRect(0, 0, ENEMY.width, ENEMY.height);
    g.generateTexture('enemy', ENEMY.width, ENEMY.height);
    g.destroy();
  }
}