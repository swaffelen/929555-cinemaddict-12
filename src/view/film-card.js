import {DESCRIPTION_MAX_LENGTH} from "../consts.js";
import {inspectFlag} from "../utils/common.js";
import AbstractView from "./abstract.js";

const createFilmCardTemplate = (film) => {
  const {title, poster, description, comments, rating,
    release, genres, runtime, isWatchlisted, isWatched, isFavorite} = film;

  const activeClass = `film-card__controls-item--active`;

  const descriptionText = description.length > DESCRIPTION_MAX_LENGTH ? `${description.slice(0, DESCRIPTION_MAX_LENGTH)}...` : description;

  const year = release.getFullYear();
  return (
    `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${runtime}</span>
            <span class="film-card__genre">${genres[0]}</span>
          </p>
          <img src="./${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${descriptionText}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${inspectFlag(isWatchlisted, activeClass)}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${inspectFlag(isWatched, activeClass)}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${inspectFlag(isFavorite, activeClass)}">Mark as favorite</button>
          </form>
    </article>`
  );
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._openPopupClickHandler = this._openPopupClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setOpenPopupClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener(`click`, this._openPopupClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;

    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._watchlistClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;

    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._favoriteClickHandler);
  }

  _openPopupClickHandler(evt) {
    evt.preventDefault();

    const poster = this.getElement().querySelector(`.film-card__poster`);
    const title = this.getElement().querySelector(`.film-card__title`);
    const comments = this.getElement().querySelector(`.film-card__comments`);

    if (evt.target === poster || evt.target === title || evt.target === comments) {
      this._callback.click();
    }
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();

    this._callback.watchlistClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();

    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();

    this._callback.favoriteClick();
  }
}
