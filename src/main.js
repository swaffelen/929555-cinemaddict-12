import {createUserRankTemplate} from "./view/user-rank.js";
import {createNavigationTemplate} from "./view/navigation.js";
import {createFilterTemplate} from "./view/filter.js";
import {createFilmsContainerTemplate} from "./view/films-container.js";
import {createFilmsListTemplate} from "./view/films-list.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreButton} from "./view/show-more-button.js";
import {createFilmsListExtraTemplate} from "./view/films-list-extra.js";
import {createFooterStatisticTemplate} from "./view/footer-statistic.js";
import {render} from "./utils/render.js";

const FILMS_GRID_COUNT = 5;
const FILMS_EXTRA_COUNT = 2;

const headerElement = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footer = document.querySelector(`.footer`);

render(headerElement, `beforeend`, createUserRankTemplate());

render(main, `beforeend`, createNavigationTemplate());
render(main, `beforeend`, createFilterTemplate());
render(main, `beforeend`, createFilmsContainerTemplate());

const films = main.querySelector(`.films`);

render(films, `beforeend`, createFilmsListTemplate());

const filmsListContainer = films.querySelector(`.films-list__container`);

for (let i = 0; i < FILMS_GRID_COUNT; i++) {
  render(filmsListContainer, `beforeend`, createFilmCardTemplate());
}

const filmsList = films.querySelector(`.films-list`);

render(filmsList, `beforeend`, createShowMoreButton());

render(films, `beforeend`, createFilmsListExtraTemplate(`Top rated`));
render(films, `beforeend`, createFilmsListExtraTemplate(`Most commented`));

const filmsListExtras = films.querySelectorAll(`.films-list--extra`);

filmsListExtras.forEach((node) => {
  const container = node.querySelector(`.films-list__container`);
  for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
    render(container, `beforeend`, createFilmCardTemplate());
  }
});

render(footer, `beforeend`, createFooterStatisticTemplate());
