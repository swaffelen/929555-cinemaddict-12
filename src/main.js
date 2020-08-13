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
import {render, processEscPressKey} from "../src/util.js";

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

  const onPopupEscPress = (evt) => processEscPressKey(evt, closePopup);

  const openPopup = () => {
    document.body.append(filmDetailsComponent.getElement());
    document.addEventListener(`keydown`, onPopupEscPress);
  };

  const closePopup = () => {
    filmDetailsComponent.getElement().remove();
  };

  filmCardComponent.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();

    const poster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
    const title = filmCardComponent.getElement().querySelector(`.film-card__title`);
    const comments = filmCardComponent.getElement().querySelector(`.film-card__comments`);

    if (evt.target === poster || evt.target === title || evt.target === comments) {
      openPopup();
    }
  });

  filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`)
  .addEventListener(`click`, () => {
    closePopup();
  });

  render(filmListElement, filmCardComponent.getElement());
};

const renderFilmBoard = (filmBoardContainer, filmItems) => {
  const filmsContainerComponent = new FilmsContainerView();
  render(filmBoardContainer, filmsContainerComponent.getElement());

  const filmsListComponent = new FilmsListView(films);
  render(filmsContainerComponent.getElement(), filmsListComponent.getElement());

  const filmsListContainerComponent = new FilmsListContainerView();

  if (filmItems.length) {
    render(filmsListComponent.getElement(), filmsListContainerComponent.getElement());

    filmItems
    .slice(0, Math.min(FILMS_GRID_COUNT, FILMS_COUNT_PER_STEP))
    .forEach((filmItem) => renderFilm(filmsListContainerComponent.getElement(), filmItem));

    EXTRA_FILMS_CATEGORIES.forEach((category) => {
      render(filmsContainerComponent.getElement(), new FilmsListExtraView(category).getElement());
    });

    const [topRatedNode, mostCommentedNode] = filmsContainerComponent.getElement()
    .querySelectorAll(`.films-list--extra .films-list__container`);

    for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
      renderFilm(topRatedNode, filmsTopRated[i]);
      renderFilm(mostCommentedNode, filmsTopCommented[i]);
    }
  }

  if (filmItems.length > FILMS_COUNT_PER_STEP) {
    let renderedFilmsCounter = FILMS_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();
    render(filmsListComponent.getElement(), showMoreButtonComponent.getElement());


    showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

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

render(headerElement, new RankView(filters.watched).getElement());
render(main, new NavigationView(filters).getElement());
render(main, new SortView().getElement());
render(footerStatistics, new FooterStatisticsView(films).getElement());

renderFilmBoard(main, films);
