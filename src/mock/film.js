import {getRandomInteger} from "../util.js";

const TEXT_FILLERS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. `,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. `,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
  `In rutrum ac purus sit amet tempus. `];

const TITLES = [
  `Made For Each Other`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
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
  `angry`,
  `puke`,
  `sleeping`,
  `smile`];

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

const DIRECTORS = [
  `Sam Raimi`,
  `David Cronenberg`,
  `Brian De Palma`,
  `Quentin Tarantino`,
  `Clint Eastwood`,
  `Kathryn Bigelow`,
  `Terrence Malick`,
  `Woody Allen`,
  `Spike Lee`,
  `Tim Burton`];

const SCREENWRITERS = [
  `Quentin Tarantino`,
  `Federico Fellini`,
  `Stanley Kubrick`,
  `David Fincher`,
  `Robert Zemeckis`,
  `Ridley Scott`];

const ACTORS = [
  `William Hurt`,
  `Yul Brynner`,
  `Ernest Borgnine`,
  `Benedict Cumberbatch`,
  `Rod Steiger`,
  `José Ferrer`,
  `Broderick Crawford`,
  `Ronald Colman`,
  `Fredric MarchRay`,
  `Milland Bing`
];

const COUNTRY_LIST = [
  `United Kingdom`,
  `Sweden`,
  `Singapore`,
  `USA`,
  `France`
];

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

const getRandomValues = (array, min, max) => {
  return Array.from({length: getRandomInteger(min, max)}).
  map(() => array[getRandomInteger(0, array.length - 1)]);
};

export const generateFilm = () => {
  const comments = Array.from({length: getRandomInteger(0, 10)})
  .map(generateComments);

  const release = generateDate(new Date(1896, 0, 1), new Date(2020, 0, 1));

  const runtime = convertMinsIntoHours(getRandomInteger(16, 180));

  return {
    title: TITLES[getRandomInteger(0, TITLES.length - 1)],
    poster: POSTERS[getRandomInteger(0, POSTERS.length - 1)],
    description: generateDescription(),
    comments,
    age: `${getRandomInteger(6, 18)}+`,
    rating: generateFilmsRanking(),
    release,
    genres: getRandomValues(GENRES, 1, 3),
    runtime,
    director: DIRECTORS[getRandomInteger(0, DIRECTORS.length - 1)],
    writers: getRandomValues(SCREENWRITERS, 1, 3),
    cast: getRandomValues(ACTORS, 2, 5),
    country: COUNTRY_LIST[getRandomInteger(0, COUNTRY_LIST.length - 1)],
    isWatchlisted: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};

