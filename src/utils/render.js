import Abstract from "../view/abstract.js";

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (element, container, place = RenderPosition.BEFOREEND) => {
  if (element instanceof Abstract) {
    element = element.getElement();
  }

  if (container instanceof Abstract) {
    container = container.getElement();
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

export const insertElement = (element) => {
  if (element instanceof Abstract) {
    element = element.getElement();
  }

  document.body.append(element);
};

export const detachElement = (element) => {
  if (element instanceof Abstract) {
    element = element.getElement();
  }
  element.remove();
};

export const remove = (component) => {
  if (!(component instanceof Abstract)) {
    throw new Error(`Only components can be removed`);
  }

  component.getElement().remove();
  component.removeElement();
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};


export const sortByDate = (films) => {
  return [...films].sort((a, b) => b.release.getTime() - a.release.getTime());
};

export const sortByRating = (films) => {
  return [...films].sort((a, b) => b.rating - a.rating);
};

export const sortByTopCommented = (films) => {
  return [...films].sort((a, b) => b.comments.length - a.comments.length);
};
