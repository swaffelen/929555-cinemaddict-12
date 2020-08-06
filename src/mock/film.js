import {getRandomInteger} from "../util.js";

const TEXT_FILLERS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. `,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. `,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
  `In rutrum ac purus sit amet tempus. `];

const TITLES = [
  `Made For Each Other`, `
  Popeye Meets Sinbad`,
  `Sagebrush Trail`,
  `Santa Claus Conquers The Martians`,
  `The Dance Of Life`,
  `The Great Flamarion`,
  `The Man With The Golden Arm`];

const POSTERS = [
  `images/posters/made-for-each-other.png`,
  `images/posters/popeye-meets-sinbad.png`,
  `images/posters/sagebrush-trail.jpg`,
  `images/posters/santa-claus-conquers-the-martians.jpg`,
  `images/posters/the-dance-of-life.jpg`,
  `images/posters/the-great-flamarion.jpg`,
  `images/posters/the-man-with-the-golden-arm.jpg`];

const GENRES = [
  `Musical`,
  `Western`,
  `Drama`,
  `Adventure`,
  `Action`,
  `Horror`];

const EMOJIS = [
  `images/emoji/angry.png`,
  `images/emoji/puke.png`,
  `images/emoji/sleeping.png`,
  `images/emoji/smile.png`];

const AUTHORS = [
  `Misael Santos`,
  `Paul Mooney`,
  `Lillie Dominguez`,
  `Santiago Hale`,
  `Stacy Bright`,
  `Tamia Vang`,
  `Gage Rush`,
  `Alaina Robinson`,
  `Nigel Yates`,
  `Johanna Ryan`,
  `Emilio Miranda`,
  `Rene Armstrong`];


const generateDescription = () => {
  return new Array(getRandomInteger(1, 5)).fill(``).reduce((acc) => {
    return acc + TEXT_FILLERS[getRandomInteger(0, TEXT_FILLERS.length - 1)];
  }, ``);
};

const generateDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const convertMinsIntoHours = (value) => {
  const minutes = (value % 60);
  const hours = (value - minutes) / 60;

  return `${hours}h ${minutes}m`;
};

const generateComments = () => {
  return {
    emotion: EMOJIS[getRandomInteger(0, EMOJIS.length - 1)],
    date: generateDate(new Date(2012, 0, 1), new Date()),
    name: AUTHORS[getRandomInteger(0, AUTHORS.length - 1)],
    message: TEXT_FILLERS[getRandomInteger(0, TEXT_FILLERS.length - 1)]
  };
};

const generateFilmsRanking = () => {
  const ranking = `${getRandomInteger(1, 10)}.${getRandomInteger(0, 9)}`;

  return ranking > 10 ? generateFilmsRanking() : ranking;
};

export const generateFilm = () => {
  const comments = Array.from({length: getRandomInteger(0, 10)})
  .map(generateComments);

  const year = generateDate(new Date(1896, 0, 1), new Date(2020, 0, 1)).getFullYear();

  const duration = convertMinsIntoHours(getRandomInteger(16, 180));

  return {
    title: TITLES[getRandomInteger(0, TITLES.length - 1)],
    poster: POSTERS[getRandomInteger(0, POSTERS.length - 1)],
    description: generateDescription(),
    comments,
    rating: generateFilmsRanking(),
    year,
    genre: GENRES[getRandomInteger(0, GENRES.length - 1)],
    duration,
    isWatchlisted: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};

