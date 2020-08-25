export const getRandomInteger = (min = 0, max = 1) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


export const generateDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const inspectFlag = (flag, template) => {
  return flag ? template : ``;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

