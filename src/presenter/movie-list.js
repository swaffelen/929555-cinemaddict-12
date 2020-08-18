import SortView from "../view/sort.js";
import FilmsContainerView from "../view/films-container.js";
import FilmsListView from "../view/films-list.js";
import FilmsListContainerView from "../view/films-list-container.js";
import FilmCardView from "../view/film-card.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import FilmsListExtraView from "../view/films-list-extra.js";
import FilmDetailsView from "../view/film-details.js";
import {EXTRA_FILMS_CATEGORIES, SortType} from "../consts.js";
import {render, insertElement, detachElement,
  remove, sortByRating, sortByTopCommented} from "../utils/render.js";

const FILMS_EXTRA_COUNT = 2;
const FILMS_LOAD_PER_STEP = 5;

export default class MovieList {
  constructor(filmBoardContainer, films) {
    this._filmBoardContainer = filmBoardContainer;
    this._films = films.slice();
    this._sourcedFilms = films.slice();

    this._sortComponent = new SortView();
    this._filmsListComponent = new FilmsListView(this._films);
    this._filmsContainerComponent = new FilmsContainerView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    this._renderedFilmsCounter = FILMS_LOAD_PER_STEP;
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._filmsTopRated = sortByRating(this._films);
    this._filmsTopCommented = sortByTopCommented(this._films);
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
      case SortType.DATE:
        this._films.sort((a, b) => b.release.getTime() - a.release.getTime());
        break;
      case SortType.RATING:
        console.log(sortByRating(this._films));
        sortByRating(this._films);
        break;
      default:
        this._films = this._sourcedFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _clearFilmList() {
    this._filmsListContainerComponent.getElement().innerHTML = ``;
    this._renderedFilmsCounter = FILMS_LOAD_PER_STEP;
  }


  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilms(0, Math.min(this._films.length, FILMS_LOAD_PER_STEP));
  }

  _renderSort() {
    render(this._sortComponent, this._filmBoardContainer);
    this._sortComponent.setClickHandler(this._handleSortTypeChange);
  }

  _renderFilm(film, container = this._filmsListContainerComponent) {
    const filmCardComponent = new FilmCardView(film);
    const filmDetailsComponent = new FilmDetailsView(film);

    const newCommentInput = filmDetailsComponent.getElement().querySelector(`.film-details__comment-input`);

    const onPopupEscPress = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        if (document.activeElement !== newCommentInput) {
          detachElement(filmDetailsComponent);
        }
      } else {
        newCommentInput.blur();
      }
    };

    filmCardComponent.setClickHandler(() => {
      insertElement(filmDetailsComponent);
      document.addEventListener(`keydown`, onPopupEscPress);
    });

    filmDetailsComponent.setClickHandler(() => {
      detachElement(filmDetailsComponent);
      document.removeEventListener(`keydown`, onPopupEscPress);
    });

    render(filmCardComponent, container);
  }

  _renderFilms(from, to) {
    this._films
    .slice(from, to)
    .forEach((film) => this._renderFilm(film));
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

  _renderFilmsGrid() {
    this._renderFilms(0, Math.min(this._films.length, FILMS_LOAD_PER_STEP));
    this._renderExtraFilmsContainers();
    this._renderExtraFilms();


    if (this._films.length > FILMS_LOAD_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilmsBoard() {
    if (this._films.length) {
      this._renderFilmsGrid();
    }
  }
}
