import { canvas, ctx } from '~/modules/context';
import { Sprite } from '~/modules/Sprite';

(() => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const player = new Sprite({ x: 123, y: 234 });
  player.draw();

  const enemy = new Sprite({ x: 0, y: 0 });
  enemy.draw();
  console.log('player', player);
})();
