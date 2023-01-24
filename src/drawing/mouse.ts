const mousePosition = {
  x: 0,
  y: 0,
};

export const getMousePosition = (): string => {
  const x = mousePosition.x;
  const y = mousePosition.y;
  return `mouse_position ${x},${y}`;
};

export const updateMousePosition = (direction: string, step: number): void => {
  switch (direction) {
    case 'up':
      mousePosition.y = mousePosition.y + step;
      break;
    case 'down':
      mousePosition.y = mousePosition.y - step;
      break;
    case 'right':
      mousePosition.x = mousePosition.x + step;
      break;
    case 'left':
      mousePosition.x = mousePosition.x - step;
      break;
  }
};
