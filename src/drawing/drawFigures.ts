import { mouse, straightTo, Button, Point } from '@nut-tree/nut-js';

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

export const drawCircle = async (radius: number): Promise<void> => {
  const { x, y } = await mouse.getPosition();
  const center = { x: x - radius, y };

  const points = [];
  const pointsQuantity = 360;

  for (let i = 0; i < pointsQuantity; i++) {
    const newX =
      Math.cos((2 * Math.PI * i) / pointsQuantity) * radius + center.x;
    const newY =
      Math.sin((2 * Math.PI * i) / pointsQuantity) * radius + center.y;
    points.push(new Point(newX, newY));
  }

  await pressLeftButton();
  await mouse.move(points);
  await mouse.releaseButton(Button.LEFT);
};
