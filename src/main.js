import {createUserRankTemplate} from "./view/user-rank.js";
import {createNavigationTemplate} from "./view/navigation.js";
import {createSortingTemplate} from "./view/sort.js";
import {createFilmsContainerTemplate} from "./view/films-container.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreButton} from "./view/show-more-button.js";
import {createFilmsListExtraTemplate} from "./view/films-list-extra.js";
import {createFooterStatisticTemplate} from "./view/footer-statistic.js";
import {createFilmPopupTemplate} from "./view/film-details.js";
import {generateFilm} from "../src/mock/film.js";
import {countFiltersIndicators} from "../src/mock/filters.js";
import {EXTRA_FILMS_CATEGORIES} from "../src/consts.js";
import {render} from "../src/util.js";

const FILMS_GRID_COUNT = 24;
const FILMS_EXTRA_COUNT = 2;
const FILMS_COUNT_PER_STEP = 5;

const headerElement = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const films = Array.from({length: FILMS_GRID_COUNT}).map(generateFilm);
const filmsTopRated = [...films].sort((a, b) => b.rating - a.rating);
const filmsTopCommented = [...films].sort((a, b) => b.comments.length - a.comments.length);

const filters = countFiltersIndicators(films);

render(headerElement, createUserRankTemplate(filters.watched));

render(main, createNavigationTemplate(filters));
render(main, createSortingTemplate());
render(main, createFilmsContainerTemplate());

const filmsBoardElement = main.querySelector(`.films`);

render(filmsBoardElement, createFilmsListTemplate());

const filmsListContainer = filmsBoardElement.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(FILMS_GRID_COUNT, FILMS_COUNT_PER_STEP); i++) {
  render(filmsListContainer, createFilmCardTemplate(films[i]));
}

const filmsList = filmsBoardElement.querySelector(`.films-list`);

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCounter = FILMS_COUNT_PER_STEP;

  render(filmsList, createShowMoreButton());

  const showMoreButton = document.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    films
    .slice(renderedFilmsCounter, renderedFilmsCounter + FILMS_COUNT_PER_STEP)
    .forEach((film) => render(filmsListContainer, createFilmCardTemplate(film)));

    renderedFilmsCounter += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCounter >= films.length) {
      showMoreButton.remove();
    }
  });
}

EXTRA_FILMS_CATEGORIES.forEach((category) => {
  render(filmsBoardElement, createFilmsListExtraTemplate(category));
});

const filmsExtrasContainers = filmsBoardElement.querySelectorAll(`.films-list__container`);

for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
  render(filmsExtrasContainers[1], createFilmCardTemplate(filmsTopRated[i]));
  render(filmsExtrasContainers[2], createFilmCardTemplate(filmsTopCommented[i]));
}

render(footer, createFilmPopupTemplate(films[0]));
render(footer, createFooterStatisticTemplate(films));
