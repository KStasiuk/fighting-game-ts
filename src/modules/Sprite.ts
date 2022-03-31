import { ctx } from '~/modules/context';

export type SpritePosition = {
  x: number;
  y: number;
};
export class Sprite {
  constructor(public position: SpritePosition) {}

  draw = () => {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.position.x, this.position.y, 50, 150);
  };
}
