import Phaser from 'phaser';
import { GAME_W, GAME_H } from '../config';

export default class MenuScene extends Phaser.Scene {
  constructor() { super('Menu'); }

  create() {
    this.add.text(GAME_W / 2, GAME_H / 2 - 80, 'TANK GAME', {
      fontSize: '46px', color: '#e6edf3',
      fontFamily: 'monospace', fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(GAME_W / 2, GAME_H / 2 - 30, 'auto-fire', {
      fontSize: '14px', color: '#7d8590', fontFamily: 'monospace',
    }).setOrigin(0.5);

    const btn = this.add.text(GAME_W / 2, GAME_H / 2 + 60, '[ START ]', {
      fontSize: '30px', color: '#3fb950', fontFamily: 'monospace',
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    btn.on('pointerdown', () => this.scene.start('Game'));
  }
}