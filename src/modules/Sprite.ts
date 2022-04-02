import { canvas, ctx } from '~/modules/context';
import { GRAVITY } from '~/modules/consts';
import { Events } from '~/modules/events';

export type Position = {
  x: number;
  y: number;
};

export type MovesKeys = {
  left: string;
  right: string;
  up: string;
  down: string;
};

export type SpriteSettings = {
  position: Position;
  velocity: Position;
  movesKeys: MovesKeys;
  height: number;
};

export class Sprite {
  private keysVertical: { [key: string]: boolean } = {};
  private keysHorizontal: { [key: string]: boolean } = {};
  private lastKeysHorizontal = '';

  constructor(public settings: SpriteSettings) {
    this.assignKeys(this.settings.movesKeys);
    new Events().setListeners({
      keys: this.keysVertical,
    });
    new Events().setListeners({
      keys: this.keysHorizontal,
      lastKey: (value) => {
        this.lastKeysHorizontal = value;
      },
    });
  }

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
    this.moveSprite();
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

  moveSprite() {
    this.settings.velocity.x = 0;
    const {
      settings: { movesKeys },
      lastKeysHorizontal,
    } = this;
    const leftKeyPressed = this.keysHorizontal[movesKeys.left];
    const rightKeyPressed = this.keysHorizontal[movesKeys.right];

    const upKeyPressed = this.keysVertical[movesKeys.up];
    const downKeyPressed = this.keysVertical[movesKeys.down];

    if (leftKeyPressed && lastKeysHorizontal === movesKeys.left) {
      this.settings.velocity.x = -1;
    } else if (rightKeyPressed && lastKeysHorizontal === movesKeys.right) {
      this.settings.velocity.x = 1;
    }
    if (upKeyPressed) {
      this.settings.velocity.y = -10;
    } else if (downKeyPressed) {
      console.log('down');
    }
  }

  private assignKeys(keys: MovesKeys) {
    this.keysHorizontal[keys.left] = false;
    this.keysHorizontal[keys.right] = false;

    this.keysVertical[keys.up] = false;
    this.keysVertical[keys.down] = false;
  }
}
