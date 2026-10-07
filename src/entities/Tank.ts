import Phaser from 'phaser';
import { TANK } from '../config';
import Bullet from './Bullet';

export default class Tank extends Phaser.Physics.Arcade.Image {
  public moveDir = 0;
  public bullets: Phaser.Physics.Arcade.Group;
  private lastFire = 0;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'tank');
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setOrigin(0.5, 1);
    this.setCollideWorldBounds(true);

    this.bullets = scene.physics.add.group({
      classType: Bullet,
      maxSize: TANK.maxBullets,
      runChildUpdate: true,
    });
  }

  update(time: number) {
    this.setVelocityX(this.moveDir * TANK.speed);

    if (time - this.lastFire > TANK.fireCooldown) {
      this.fire(time);
    }
  }

  private fire(time: number) {
    if (this.bullets.countActive(true) >= TANK.maxBullets) return;

    const muzzleX = this.x;
    const muzzleY = this.y - TANK.height;

    const b = this.bullets.get(muzzleX, muzzleY) as Bullet | null;
    if (!b) return;

    b.fire(muzzleX, muzzleY);
    this.lastFire = time;
  }
}