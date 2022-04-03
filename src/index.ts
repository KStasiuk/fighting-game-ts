import { canvas, ctx } from '~/modules/context';
import { enemy, player } from '~/modules/players';
import { Sprite } from '~/modules/Sprite/index';

function animate() {
  window.requestAnimationFrame(animate);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();
  detectAttack(player, enemy, () => {
    console.log('player Atacen');
  });
  detectAttack(enemy, player, () => {
    console.log('Enemy Atacen');
  });
}

function detectAttack(player: Sprite, enemy: Sprite, onAttack: () => void) {
  if (
    player.attackBox.position.x + player.attackBox.width >=
      enemy.settings.position.x &&
    player.attackBox.position.x <=
      enemy.settings.position.x + enemy.settings.width &&
    player.attackBox.position.y + player.attackBox.height >=
      enemy.settings.position.y &&
    player.attackBox.position.y <=
      enemy.settings.position.y + enemy.settings.height &&
    player.isAttacking
  ) {
    onAttack();
  }
}

(() => {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  animate();
})();
