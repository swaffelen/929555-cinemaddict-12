import RankView from "./view/user-rank.js";
import NavigationView from "./view/navigation.js";
import SortView from "./view/sort.js";
import FilmsContainerView from "./view/films-container.js";
import FilmsListView from "./view/films-list.js";
import FilmsListContainerView from "./view/films-list-container.js";
import FilmCardView from "./view/film-card.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FilmsListExtraView from "./view/films-list-extra.js";
import FooterStatisticsView from "./view/footer-statistic.js";
import FilmDetailsView from "./view/film-details.js";
import {generateFilm} from "../src/mock/film.js";
import {countFiltersIndicators} from "../src/mock/filters.js";
import {EXTRA_FILMS_CATEGORIES} from "../src/consts.js";
import {processEscPressKey} from "../src/utils/common.js";
import {render, addElement, deleteElement} from "../src/utils/render.js";

const FILMS_GRID_COUNT = 24;
const FILMS_EXTRA_COUNT = 2;
const FILMS_COUNT_PER_STEP = 5;

const headerElement = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footerStatistics = document.querySelector(`.footer__statistics`);

const films = Array.from({length: FILMS_GRID_COUNT}).map(generateFilm);
const filmsTopRated = [...films].sort((a, b) => b.rating - a.rating);
const filmsTopCommented = [...films].sort((a, b) => b.comments.length - a.comments.length);
const filters = countFiltersIndicators(films);

const renderFilm = (filmListElement, film) => {
  const filmCardComponent = new FilmCardView(film);
  const filmDetailsComponent = new FilmDetailsView(film);

  const onPopupEscPress = (evt) => processEscPressKey(evt, deleteElement(filmDetailsComponent));

  filmCardComponent.setClickHandler(() => {
    addElement(filmDetailsComponent);
    document.addEventListener(`keydown`, onPopupEscPress);
  });

  filmDetailsComponent.setClickHandler(() => {
    deleteElement(filmDetailsComponent);
    document.removeEventListener(`keydown`, onPopupEscPress);
  });

  render(filmListElement, filmCardComponent);
};

const renderFilmBoard = (filmBoardContainer, filmItems) => {
  const filmsContainerComponent = new FilmsContainerView();
  render(filmBoardContainer, filmsContainerComponent);

  const filmsListComponent = new FilmsListView(films);
  render(filmsContainerComponent, filmsListComponent);

  const filmsListContainerComponent = new FilmsListContainerView();

  if (filmItems.length) {
    render(filmsListComponent, filmsListContainerComponent);

    filmItems
    .slice(0, Math.min(FILMS_GRID_COUNT, FILMS_COUNT_PER_STEP))
    .forEach((filmItem) => renderFilm(filmsListContainerComponent, filmItem));

    EXTRA_FILMS_CATEGORIES.forEach((category) => {
      render(filmsContainerComponent, new FilmsListExtraView(category));
    });

    const [topRatedNode, mostCommentedNode] = filmsContainerComponent.getElement()
    .querySelectorAll(`.films-list--extra .films-list__container`);

    for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
      renderFilm(topRatedNode, filmsTopRated[i]);
      renderFilm(mostCommentedNode, filmsTopCommented[i]);
    }
  } else {
    return;
  }

  if (filmItems.length > FILMS_COUNT_PER_STEP) {
    let renderedFilmsCounter = FILMS_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();
    render(filmsListComponent, showMoreButtonComponent);


    showMoreButtonComponent.setClickHandler(() => {
      filmItems
      .slice(renderedFilmsCounter, renderedFilmsCounter + FILMS_COUNT_PER_STEP)
      .forEach((filmItem) => renderFilm(filmsListContainerComponent.getElement(), filmItem));

      renderedFilmsCounter += FILMS_COUNT_PER_STEP;

      if (renderedFilmsCounter >= filmItems.length) {
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeElement();
      }
    });
  }
};

render(headerElement, new RankView(filters.watched));
render(main, new NavigationView(filters));
render(main, new SortView());
render(footerStatistics, new FooterStatisticsView(films));

renderFilmBoard(main, films);
