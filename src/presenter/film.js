import FilmCardView from "../view/film-card.js";
import FilmDetailsView from "../view/film-details.js";
import {render, detachElement, insertElement, remove, replace} from "../utils/render.js";


export default class Film {
  constructor(filmListContainer, changeData) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._openPopup = this._openPopup.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._onPopupEscPress = this._onPopupEscPress.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._filmDetailsComponent = new FilmDetailsView(film);

    this._filmCardComponent.setClickHandler(this._openPopup);
    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    this._filmDetailsComponent.setClickHandler(this._closePopup);
    render(this._filmCardComponent, this._filmListContainer);

    if (prevFilmCardComponent === null || prevFilmDetailsComponent === null) {
      render(this._filmCardComponent, this._filmListContainer);
      return;
    }

    if (this._filmListContainer.getElement().contains(prevFilmCardComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._filmDetailsComponent.getElement().contains(prevFilmDetailsComponent.getElement())) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmDetailsComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
  }

  _onPopupEscPress(evt) {
    const newCommentInput = this._filmDetailsComponent
    .getElement()
    .querySelector(`.film-details__comment-input`);

    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      if (document.activeElement !== newCommentInput) {
        detachElement(this._filmDetailsComponent);
      }
    } else {
      evt.stopPropagation();
    }
  }

  _openPopup() {
    insertElement(this._filmDetailsComponent);
    document.addEventListener(`keydown`, this._onPopupEscPress);
  }

  _closePopup() {
    detachElement(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onPopupEscPress);
  }

  _handleWatchlistClick() {
    this._changeData(
        Object.assign({}, this._film, {
          isWatchlisted: !this._film.isWatchlisted,
        })
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign({}, this._film, {
          isWatched: !this._film.isWatched,
        })
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign({}, this._film, {
          isFavorite: !this._film.isFavorite,
        })
    );
  }
}
