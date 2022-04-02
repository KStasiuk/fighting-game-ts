import { canvas, ctx } from '~/modules/context';
import { enemy, player } from '~/modules/players';

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();
}

(() => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  animate();
})();
