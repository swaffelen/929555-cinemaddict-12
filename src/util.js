export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);

  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const renderTemplate = (container, text, position = `beforeend`) => {
  container.insertAdjacentHTML(position, text);
};

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
