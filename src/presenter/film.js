import FilmCardView from "../view/film-card.js";
import FilmDetailsView from "../view/film-details.js";
import {render, detachElement, insertElement, remove, replace} from "../utils/render.js";

const State = {
  DEFAULT: `DEFAULT`,
  OPEN: `OPEN`
};

export default class Film {
  constructor(filmListContainer, changeData, changeState) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeState = changeState;


    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._state = State.DEFAULT;

    this._openPopup = this._openPopup.bind(this);
    this._closePopup = this._closePopup.bind(this);
    this._onPopupEscPress = this._onPopupEscPress.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._getNewData = this._getNewData.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmCardComponent = this._filmCardComponent;
    const prevFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._filmDetailsComponent = new FilmDetailsView(film, this._getNewData);

    this._filmCardComponent.setOpenPopupClickHandler(this._openPopup);
    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevFilmCardComponent === null || prevFilmDetailsComponent === null) {
      render(this._filmCardComponent, this._filmListContainer);
      return;
    }

    if (this._state === State.DEFAULT) {
      replace(this._filmCardComponent, prevFilmCardComponent);
    }

    if (this._state === State.OPEN) {
      replace(this._filmDetailsComponent, prevFilmDetailsComponent);
    }

    remove(prevFilmCardComponent);
    remove(prevFilmDetailsComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
    remove(this._filmDetailsComponent);
  }

  resetState() {
    if (this._state !== State.DEFAULT) {
      remove(this._filmDetailsComponent);
    }
  }

  _onPopupEscPress(evt) {
    const newCommentInput = this._filmDetailsComponent
    .getElement()
    .querySelector(`.film-details__comment-input`);

    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      if (document.activeElement !== newCommentInput) {
        this._closePopup();
      }
    } else {
      evt.stopPropagation();
    }
  }

  _openPopup() {
    this._changeState();
    this._state = State.OPEN;

    this._filmDetailsComponent.setClosePopupClickHandler(this._closePopup);
    insertElement(this._filmDetailsComponent);
    document.addEventListener(`keydown`, this._onPopupEscPress);
  }

  _closePopup() {
    this._state = State.DEFAULT;
    detachElement(this._filmDetailsComponent);

    if (this.newData) {
      this._changeData(
          Object.assign({}, this.newData)
      );
    }

    document.removeEventListener(`keydown`, this._onPopupEscPress);
  }

  _getNewData(newData) {
    this.newData = newData;
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
