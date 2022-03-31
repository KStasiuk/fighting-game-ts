import { canvas, ctx } from '~/modules/context';
import { Sprite } from '~/modules/Sprite';

(() => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const player = new Sprite({
    position: { x: 123, y: 234 },
    velocity: {
      x: 0,
      y: 10,
    },
    height: 100,
  });

  const enemy = new Sprite({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    height: 150,
  });

  function animate() {
    window.requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
    console.log('animaton');
  }

  animate();
})();
