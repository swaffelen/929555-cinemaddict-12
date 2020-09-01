import moment from 'moment';

export const getRandomInteger = (min = 0, max = 1) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const getCommentDate = (date) => {
  return moment(date).fromNow();
};

export const getReleaseDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const getRuntimeFormat = (duration) => {
  const time = moment.utc().startOf(`day`).add({minutes: duration});

  if (duration / 60 >= 1) {
    return time.format(`H[h] m[m]`);
  }

  return time.format(`mm[m]`);
};

export const getYearFormat = (date) => {
  return moment(date).format(`YYYY`);
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

