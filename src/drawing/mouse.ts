import { mouse, right, up, down, left } from '@nut-tree/nut-js';
import { DIRECTIONS } from './constants';

export const getMousePosition = async (): Promise<string> => {
  const { x, y } = await mouse.getPosition();
  return `mouse_position ${x},${y}`;
};

export const updateMousePosition = async (
  direction: string,
  step: number
): Promise<void> => {
  switch (direction) {
    case DIRECTIONS.UP:
      await mouse.move(up(step));
      break;
    case DIRECTIONS.DOWN:
      await mouse.move(down(step));
      break;
    case DIRECTIONS.RIGHT:
      await mouse.move(right(step));
      break;
    case DIRECTIONS.LEFT:
      await mouse.move(left(step));
      break;
  }
};
