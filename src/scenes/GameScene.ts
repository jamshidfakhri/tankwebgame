import Phaser from 'phaser';
import { GAME_W, GAME_H } from '../config';
import Tank from '../entities/Tank';
import Enemy from '../entities/Enemy';
import Controls from '../ui/Controls';

export default class GameScene extends Phaser.Scene {
  private tank!: Tank;
  private enemies!: Phaser.Physics.Arcade.Group;
  private score = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private isOver = false;

  constructor() { super('Game'); }

  create() {
    this.isOver = false;
    this.score = 0;

    this.add.rectangle(GAME_W / 2, GAME_H - 120, GAME_W, 4, 0x30363d);

    this.tank = new Tank(this, GAME_W / 2, GAME_H - 110);
    this.enemies = this.physics.add.group({ runChildUpdate: true });

    this.scoreText = this.add.text(16, 16, 'SCORE 0', {
      fontSize: '18px', color: '#e6edf3', fontFamily: 'monospace',
    });

    new Controls(this, (dir) => { this.tank.moveDir = dir; });

    this.time.addEvent({
      delay: 1500,
      loop: true,
      callback: () => this.spawnWave(),
    });

    this.physics.add.overlap(
      this.tank.bullets,
      this.enemies,
      (b, e) => {
        (b as Phaser.Physics.Arcade.Image).disableBody(true, true);
        this.explode(
          (e as Phaser.Physics.Arcade.Image).x,
          (e as Phaser.Physics.Arcade.Image).y,
        );
        (e as Phaser.Physics.Arcade.Image).destroy();
        this.addScore(10);
      },
    );

    this.physics.add.overlap(
      this.tank,
      this.enemies,
      () => this.endGame(),
    );
  }

  update(time: number) {
    if (this.isOver) return;
    this.tank.update(time);
  }

  private spawnWave() {
    if (this.isOver) return;

    const cols = 5;
    const margin = 60;
    const stepX = (GAME_W - margin * 2) / (cols - 1);

    for (let i = 0; i < cols; i++) {
      const x = margin + stepX * i;
      const enemy = new Enemy(this, x, -30);
      this.enemies.add(enemy);
    }
  }

  private explode(x: number, y: number) {
    const c = this.add.circle(x, y, 6, 0xffd33d, 1);
    this.tweens.add({
      targets: c,
      radius: 28,
      alpha: 0,
      duration: 250,
      onComplete: () => c.destroy(),
    });
  }

  private addScore(v: number) {
    this.score += v;
    this.scoreText.setText(`SCORE ${this.score}`);
  }

  private endGame() {
    if (this.isOver) return;
    this.isOver = true;

    this.tank.setVelocity(0, 0);
    this.enemies.clear(true, true);

    this.add.rectangle(GAME_W / 2, GAME_H / 2, GAME_W, GAME_H, 0x000000, 0.7);

    this.add.text(GAME_W / 2, GAME_H / 2 - 40, 'GAME OVER', {
      fontSize: '36px', color: '#f85149', fontFamily: 'monospace',
    }).setOrigin(0.5);

    this.add.text(GAME_W / 2, GAME_H / 2 + 10, `Score: ${this.score}`, {
      fontSize: '22px', color: '#e6edf3', fontFamily: 'monospace',
    }).setOrigin(0.5);

    const btn = this.add.text(GAME_W / 2, GAME_H / 2 + 80, '↻ RETRY', {
      fontSize: '26px', color: '#3fb950', fontFamily: 'monospace',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerdown', () => this.scene.restart());
  }
}