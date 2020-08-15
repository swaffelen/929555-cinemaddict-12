import {DESCRIPTION_MAX_LENGTH} from "../consts.js";
import {inspectFlag} from "../util.js";
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
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }
}
