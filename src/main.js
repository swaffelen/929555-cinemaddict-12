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
import {render} from "../src/util.js";

const FILMS_GRID_COUNT = 5;
const FILMS_EXTRA_COUNT = 2;

const headerElement = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

const films = Array.from({length: FILMS_GRID_COUNT}).map(generateFilm);
const filters = countFiltersIndicators(films);

render(headerElement, `beforeend`, createUserRankTemplate());

render(main, `beforeend`, createNavigationTemplate(filters));
render(main, `beforeend`, createSortingTemplate());
render(main, `beforeend`, createFilmsContainerTemplate());

const filmsBoardElement = main.querySelector(`.films`);

render(filmsBoardElement, `beforeend`, createFilmsListTemplate());

const filmsListContainer = filmsBoardElement.querySelector(`.films-list__container`);

for (let i = 0; i < FILMS_GRID_COUNT; i++) {
  render(filmsListContainer, `beforeend`, createFilmCardTemplate(films[i]));
}

const filmsList = filmsBoardElement.querySelector(`.films-list`);

render(filmsList, `beforeend`, createShowMoreButton());

render(filmsBoardElement, `beforeend`, createFilmsListExtraTemplate(`Top rated`));
render(filmsBoardElement, `beforeend`, createFilmsListExtraTemplate(`Most commented`));

const filmsListExtras = filmsBoardElement.querySelectorAll(`.films-list--extra`);

filmsListExtras.forEach((node) => {
  const container = node.querySelector(`.films-list__container`);
  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    render(container, `beforeend`, createFilmCardTemplate(films[i]));
  }
});

// render(footer, `afterbegin`, createFilmPopupTemplate(films[0]));
render(footer, `beforeend`, createFooterStatisticTemplate());
