import SortView from "../view/sort.js";
import FilmsContainerView from "../view/films-container.js";
import FilmsListView from "../view/films-list.js";
import FilmsListContainerView from "../view/films-list-container.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmsListExtraView from "../view/films-list-extra.js";
import FilmPresenter from "./film.js";
import {EXTRA_FILMS_CATEGORIES, SortType} from "../consts.js";
import {render, remove, sortByRating, sortByTopCommented, sortByDate} from "../utils/render.js";

const FILMS_EXTRA_COUNT = 2;
const FILMS_LOAD_PER_STEP = 5;

export default class MovieList {
  constructor(filmBoardContainer, films) {
    this._filmBoardContainer = filmBoardContainer;
    this._films = films.slice();
    this._sourcedFilms = films.slice();
    this._filmsTopRated = sortByRating(this._films);
    this._filmsTopCommented = sortByTopCommented(this._films);
    this._renderedFilmsCounter = FILMS_LOAD_PER_STEP;
    this._currentSortType = SortType.BY_DEFAULT;
    this._filmPresenter = {};

    this._sortComponent = new SortView();
    this._filmsListComponent = new FilmsListView(this._films);
    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init() {
    this._renderSort();
    render(this._filmsContainerComponent, this._filmBoardContainer);
    render(this._filmsListComponent, this._filmsContainerComponent);
    render(this._filmsListContainerComponent, this._filmsListComponent);

    this._renderFilmsBoard();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.BY_DATE:
        this._films = sortByDate(this._films);
        break;
      case SortType.BY_RATING:
        this._films = sortByRating(this._films);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmsGrid();
    // this._renderExtraFilms();
  }

  _renderSort() {
    render(this._sortComponent, this._filmBoardContainer);
    this._sortComponent.setClickHandler(this._handleSortTypeChange);
  }

  _renderFilm(film, container = this._filmsListContainerComponent) {
    const filmPresenter = new FilmPresenter(container);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(from, to) {
    this._films
    .slice(from, to)
    .forEach((film) => this._renderFilm(film));
  }

  _renderExtraFilmsContainers() {
    EXTRA_FILMS_CATEGORIES.forEach((category) => {
      render(new FilmsListExtraView(category), this._filmsContainerComponent);
    });
  }

  _renderExtraFilms() {
    const [topRatedNode, mostCommentedNode] = this._filmsContainerComponent.getElement()
    .querySelectorAll(`.films-list--extra .films-list__container`);

    for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
      this._renderFilm(this._filmsTopRated[i], topRatedNode);
      this._renderFilm(this._filmsTopCommented[i], mostCommentedNode);
    }
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmsCounter, this._renderedFilmsCounter + FILMS_LOAD_PER_STEP);

    this._renderedFilmsCounter += FILMS_LOAD_PER_STEP;

    if (this._renderedFilmsCounter >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._showMoreButtonComponent, this._filmsListComponent);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderedFilmsCounter = FILMS_LOAD_PER_STEP;
    // console.log(this._filmPresenter, this._renderedFilmsCounter);
  }

  _renderFilmsGrid() {
    this._renderFilms(0, Math.min(this._films.length, FILMS_LOAD_PER_STEP));

    if (this._films.length > FILMS_LOAD_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmsBoard() {
    if (this._films.length) {
      this._renderFilmsGrid();
      this._renderExtraFilmsContainers();
      // this._renderExtraFilms();
    }
  }
}
