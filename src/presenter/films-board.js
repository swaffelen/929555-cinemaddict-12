import FilmsContainerView from "./view/films-container.js";
import FilmsListView from "./view/films-list.js";
import FilmsListContainerView from "./view/films-list-container.js";
import FilmCardView from "./view/film-card.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import FilmsListExtraView from "./view/films-list-extra.js";
import FilmDetailsView from "./view/film-details.js";
import {EXTRA_FILMS_CATEGORIES} from "../src/consts.js";
import {processEscPressKey} from "../src/utils/common.js";
import {render, addElement, deleteElement} from "../utils/render.js";

const FILMS_EXTRA_COUNT = 2;
const FILMS_LOAD_PER_STEP = 5;

export default class FilmsBoard {
  constructor(filmBoardContainer) {
    this._filmBoardContainer = filmBoardContainer;

    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    this._showMoreButtonComponent = new ShowMoreButtonView();
  }

  init(films, filmsTopRated, filmsTopCommented) {
    this._films = films.slice();

    this._filmsListComponent = new FilmsListView(films);
    this._filmsTopRated = filmsTopRated;
    this._filmsTopCommented = filmsTopCommented;

    render(this._filmBoardContainer, this._filmsContainerComponent);
    render(this._filmsContainerComponent, this._filmsListComponent);
    render(this._filmsListComponent, this._filmsListContainerComponent);
  }

  // _renderFilmsContainer() {
  //   render(this._filmBoardContainer, this._filmsContainerComponent);
  // }

  // _renderFilmsList() {
  //   render(this._filmsContainerComponent, this._filmsListComponent);
  // }

  // _renderFilmsListContainer() {
  //   render(this._filmsListComponent, this._filmsListContainerComponent);
  // }

  _renderFilm(film) {
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

    render(this._filmsListContainerComponent, filmCardComponent);
  }

  _renderFilms(from, to) {
    this._films
    .slice(from, to)
    .forEach((film) => this._renderFilm(film));
  }

  _renderExtraFilmsContainers() {
    EXTRA_FILMS_CATEGORIES.forEach((category) => {
      render(this._filmsContainerComponent, new FilmsListExtraView(category));
    });
  }

  _renderExtraFilms() {
    const [topRatedNode, mostCommentedNode] = this._filmsContainerComponent.getElement()
    .querySelectorAll(`.films-list--extra .films-list__container`);

    for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
      this._renderFilm(topRatedNode, this._filmsTopRated[i]);
      this._renderFilm(mostCommentedNode, this._filmsTopCommented[i]);
    }
  }

  _renderShowMoreButton() {
    let renderedFilmsCounter = FILMS_LOAD_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();
    render(this._filmsListComponent, showMoreButtonComponent);


    showMoreButtonComponent.setClickHandler(() => {
      this._films
      .slice(renderedFilmsCounter, renderedFilmsCounter + FILMS_LOAD_PER_STEP)
      .forEach((film) => this._renderFilm(film));

      renderedFilmsCounter += FILMS_LOAD_PER_STEP;

      if (renderedFilmsCounter >= this._films.length) { // дописать метод remove;
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeElement();
      }
    });
  }

  _renderFilmsGrid() {
    this._renderFilms(0, Math.min(this._films.length, FILMS_LOAD_PER_STEP));

    if (this._films.length > FILMS_LOAD_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmsBoard() {
    if (this._films) {
      this._renderFilmsGrid();
      this._renderExtraFilmsContainers();
      this._renderExtraFilms();
    }
  }
}
