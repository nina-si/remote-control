import { mouse, straightTo, Button } from '@nut-tree/nut-js';

const pressLeftButton = async () => {
  await mouse.releaseButton(Button.LEFT);
  await mouse.pressButton(Button.LEFT);
};

export const drawRectangle = async (
  width: number,
  height: number
): Promise<void> => {
  const { x, y } = await mouse.getPosition();

  await pressLeftButton();

  await mouse.move(straightTo({ x: x + width, y }));
  await pressLeftButton();
  await mouse.move(straightTo({ x: x + width, y: y + height }));
  await pressLeftButton();
  await mouse.move(straightTo({ x, y: y + height }));
  await pressLeftButton();
  await mouse.move(straightTo({ x, y }));

  await mouse.releaseButton(Button.LEFT);
};

export const drawSquare = async (sideLength: number): Promise<void> => {
  await drawRectangle(sideLength, sideLength);
};
