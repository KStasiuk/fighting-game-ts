import { canvas, ctx } from '~/modules/context';
import { Sprite } from '~/modules/Sprite';
import { events } from '~/modules/events';

(() => {
  const keys = {
    a: false,
    d: false,
  };
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const player = new Sprite({
    position: { x: 123, y: 234 },
    velocity: {
      x: 0,
      y: 10,
    },
    height: 100,
  });
  events.setListeners({
    keys,
    // down: {
    //   d: () => {
    //     player.settings.velocity.x = 10;
    //   },
    //   a: () => {
    //     player.settings.velocity.x = -10;
    //   },
    // },
    // up: {
    //   d: () => {
    //     player.settings.velocity.x = 0;
    //   },
    //   a: () => {
    //     player.settings.velocity.x = 0;
    //   },
    // },
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
    player.settings.velocity.x = 0;
    if (keys.a) {
      player.settings.velocity.x = -1;
    } else if (keys.d) {
      player.settings.velocity.x = 1;
    }
  }

  animate();
})();
