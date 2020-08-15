export const getRandomInteger = (min = 0, max = 1) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


export const generateDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const inspectFlag = (flag, template) => {
  return flag ? template : ``;
};

export const processEscPressKey = (evt, fn) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    evt.preventDefault();
    fn();
    document.removeEventListener(`keydown`, fn);
  }
};
