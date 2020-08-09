export const render = (container, text, position = `beforeend`) => {
  container.insertAdjacentHTML(position, text);
};

export const inspectFlag = (flag, template) => {
  return flag ? template : ``;
};
