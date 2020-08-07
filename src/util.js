export const render = (container, position, text) => {
  container.insertAdjacentHTML(position, text);
};

export const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const humanizeDate = (date) => {
  return date.toLocaleString(`en-US`, {month: `long`, year: `numeric`});
};