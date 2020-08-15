import Abstract from "../view/abstract.js";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, element, place = RenderPosition.BEFOREEND) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

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
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(position, text);
};

export const addElement = (element) => {
  if (element instanceof Abstract) {
    element = element.getElement();
  }

  const filmDetails = document.body.querySelector(`.film-details`);

  if (!filmDetails) {
    document.body.append(element);
  }
};

export const deleteElement = (element) => {
  if (element instanceof Abstract) {
    element = element.getElement();
  }
  element.remove();
};

