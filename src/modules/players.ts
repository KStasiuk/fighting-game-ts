import { Sprite } from '~/modules/Sprite';

export const player = new Sprite({
  position: { x: 0, y: 0 },
  velocity: {
    x: 0,
    y: 10,
  },
  width: 50,
  height: 100,
  movesKeys: {
    left: 'a',
    right: 'd',
    up: 'w',
    down: 's',
  },
  color: 'blue',
});

export const enemy = new Sprite({
  position: { x: 123, y: 234 },
  velocity: { x: 0, y: 0 },
  width: 50,
  height: 150,
  movesKeys: {
    left: 'ArrowLeft',
    right: 'ArrowRight',
    up: 'ArrowUp',
    down: 'ArrowDown',
  },
});
