import Phaser from 'phaser';
import { GAME_W, GAME_H } from '../config';

export default class Controls {
  constructor(scene: Phaser.Scene, onMove: (dir: number) => void) {
    const size = 100;
    const y = GAME_H - 70;

    this.makeButton(scene, 80, y, size, '◀',
      () => onMove(-1), () => onMove(0));
    this.makeButton(scene, GAME_W - 80, y, size, '▶',
      () => onMove(1), () => onMove(0));

    const kb = scene.input.keyboard;
    if (kb) {
      kb.on('keydown-LEFT', () => onMove(-1));
      kb.on('keyup-LEFT', () => onMove(0));
      kb.on('keydown-RIGHT', () => onMove(1));
      kb.on('keyup-RIGHT', () => onMove(0));
    }
  }

  private makeButton(
    scene: Phaser.Scene,
    x: number, y: number, size: number,
    label: string,
    onDown: () => void, onUp: () => void,
  ) {
    const bg = scene.add.circle(0, 0, size / 2, 0x21262d)
      .setStrokeStyle(2, 0x30363d);
    const txt = scene.add.text(0, 0, label, {
      fontSize: '36px', color: '#e6edf3', fontFamily: 'monospace',
    }).setOrigin(0.5);

    const c = scene.add.container(x, y, [bg, txt]);
    c.setSize(size, size);
    c.setInteractive(
      new Phaser.Geom.Circle(size / 2, size / 2, size / 2),
      Phaser.Geom.Circle.Contains,
    );

    c.on('pointerdown', onDown);
    c.on('pointerup', onUp);
    c.on('pointerout', onUp);
    c.on('pointerupoutside', onUp);
  }
}