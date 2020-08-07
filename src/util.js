export const render = (container, text, position = `beforeend`) => {
  container.insertAdjacentHTML(position, text);
};

export const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
