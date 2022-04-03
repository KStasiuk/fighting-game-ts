import { GRAVITY, JUMP, MOVE_SPEED } from '~/modules/consts';
import { canvas, ctx } from '~/modules/context';
import { Events } from '~/modules/Events';

import { AttackBox, MovesKeys, PressedKeys, SpriteSettings } from './types';

export class Sprite {
  private verticalKeys: PressedKeys = {};
  private attackKey: PressedKeys = {};
  private horizontalKeys: PressedKeys = {};
  private lastHorizontalKeys = '';

  private movementSpeed = MOVE_SPEED;
  private _isAttacking = false;
  get isAttacking() {
    return this._isAttacking;
  }

  public readonly attackBox: AttackBox;

  constructor(public settings: SpriteSettings) {
    this.attackBox = {
      position: settings.position,
      width: 100,
      height: 50,
      color: 'yellow',
    };
    this.assignKeys(this.settings.movesKeys);
    this.handleKeyboard();
  }

  draw = () => {
    ctx.fillStyle = this.settings.color || 'red';
    ctx.fillRect(
      this.settings.position.x,
      this.settings.position.y,
      this.settings.width,
      this.settings.height,
    );
    this.attackBoxDraw();
  };

  attackBoxDraw() {
    const { position, width, height, color } = this.attackBox;
    ctx.fillStyle = color;
    ctx.fillRect(position.x, position.y, width, height);
  }

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
      lastHorizontalKeys,
    } = this;
    const leftKeyPressed = this.horizontalKeys[movesKeys.left];
    const rightKeyPressed = this.horizontalKeys[movesKeys.right];

    const upKeyPressed = this.verticalKeys[movesKeys.up];
    const downKeyPressed = this.verticalKeys[movesKeys.down];

    if (leftKeyPressed && lastHorizontalKeys === movesKeys.left) {
      this.settings.velocity.x = -this.movementSpeed;
    } else if (rightKeyPressed && lastHorizontalKeys === movesKeys.right) {
      this.settings.velocity.x = this.movementSpeed;
    }
    if (upKeyPressed) {
      this.settings.velocity.y = JUMP;
    } else if (downKeyPressed) {
      console.log('down');
    }
  }

  private attack() {
    this._isAttacking = true;
    setTimeout(() => {
      this._isAttacking = false;
    }, 100);
  }

  private assignKeys(keys: MovesKeys) {
    this.horizontalKeys[keys.left] = false;
    this.horizontalKeys[keys.right] = false;

    this.verticalKeys[keys.up] = false;
    this.verticalKeys[keys.down] = false;

    this.attackKey[keys.attack] = false;
  }

  private handleKeyboard() {
    const verticalKeys = Object.keys(this.verticalKeys);
    const horizontalKeys = Object.keys(this.horizontalKeys);
    const attackKeys = Object.keys(this.attackKey);

    new Events(
      [...verticalKeys, ...horizontalKeys, ...attackKeys],
      (key, pressed) => {
        if (verticalKeys.includes(key)) {
          resetKeys(this.verticalKeys);
          this.verticalKeys[key] = pressed;
        }
        if (horizontalKeys.includes(key)) {
          resetKeys(this.horizontalKeys);
          this.horizontalKeys[key] = pressed;
        }
        if (attackKeys.includes(key)) {
          resetKeys(this.attackKey);
          this.attack();
        }
      },
      (lastKey) => {
        if (horizontalKeys.includes(lastKey)) {
          this.lastHorizontalKeys = lastKey;
        }
      },
    );
    function resetKeys(keyHandler: { [key: string]: boolean }) {
      Object.keys(keyHandler).forEach((key) => {
        keyHandler[key] = false;
      });
    }
  }
}
