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
  color?: string;
  height: number;
  width: number;
};

export type AttackBox = {
  position: Position;
  width: number;
  height: number;
  color: string;
};
