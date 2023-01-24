const mousePosition = {
  x: 15,
  y: 0,
};

export const getMousePosition = () => {
  return `mouse_position ${mousePosition.x},${mousePosition.y}`;
};
