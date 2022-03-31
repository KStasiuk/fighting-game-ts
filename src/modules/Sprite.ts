import { canvas, ctx } from '~/modules/context';
import { GRAVITY } from '~/modules/consts';

export type Position = {
  x: number;
  y: number;
};

export type SpriteSettings = {
  position: Position;
  velocity: Position;
  height: number;
};

export class Sprite {
  constructor(public settings: SpriteSettings) {}

  draw = () => {
    ctx.fillStyle = 'red';
    ctx.fillRect(
      this.settings.position.x,
      this.settings.position.y,
      50,
      this.settings.height,
    );
  };

  update() {
    this.draw();
    const { position, velocity, height } = this.settings;
    position.y += velocity.y;
    position.x += velocity.x;
    if (position.y + height + velocity.y >= canvas.height) {
      velocity.y = 0;
    } else {
      velocity.y += GRAVITY;
    }
  }
}
