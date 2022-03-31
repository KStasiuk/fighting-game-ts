const canvas = document.querySelector('canvas')!;
if (canvas === null) {
  throw new Error('Can not find canvas element');
}

canvas.width = 1024;
canvas.height = 576;

const ctx = canvas.getContext('2d')!;
if (ctx === null) {
  throw new Error('Can not canvas 2d context');
}
export { canvas, ctx };
