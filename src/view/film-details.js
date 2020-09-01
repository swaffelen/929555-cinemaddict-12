import {EMOJIS} from "../consts.js";
import {inspectFlag} from "../utils/common.js";
import SmartView from "./smart.js";
import {renderTemplate} from "../utils/render.js";

const createGenresTemplate = (genres) => {
  return (
    `<td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
    <td class="film-details__cell">
      ${genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``)}
    </td>`
  );
};

const createCommentsTemplate = (comments) => {
  return comments.map((comment) => {
    const {emotion, message, name, date} = comment;

    const day = date.toLocaleString(`en-US`, {day: `numeric`, month: `numeric`, year: `numeric`});
    const time = `${date.getHours()}:${date.getMinutes()}`;

    return (
      `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${message}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${name}</span>
          <span class="film-details__comment-day">${day} ${time}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
      </li>`
    );
  }).join(``);
};

const createFilmPopupTemplate = (data) => {
  const {poster, age, title, rating, director, writers,
    cast, release, runtime, country, genres, description, comments, isWatchlisted, isWatched, isFavorite} = data;

  const genresTemplate = createGenresTemplate(genres);

  const releaseDate = `${release.getDate()} ${release.toLocaleString(`en-US`, {month: `long`, year: `numeric`})}`;

  const commentsTemplate = createCommentsTemplate(comments);

  const newCommentEmojiList = EMOJIS.map((emoji) => {
    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
      <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
      </label>`
    );
  }).join(``);

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./${poster}" alt="">

          <p class="film-details__age">${age}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${cast.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${releaseDate}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${runtime}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              ${genresTemplate}
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${inspectFlag(isWatchlisted, `checked`)}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${inspectFlag(isWatched, `checked`)}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${inspectFlag(isFavorite, `checked`)}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
        ${commentsTemplate}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label">
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            ${newCommentEmojiList}
          </div>
        </div>
      </section>`
  );
};

export default class FilmDetails extends SmartView {
  constructor(data, changeFilmData) {
    super();
    this._data = data;

    this.changeFilmData = changeFilmData;
    this._clickCloseButtonHandler = this._clickCloseButtonHandler.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);

    this.setInnerHandlers();
  }

  getTemplate() {
    return createFilmPopupTemplate(this._data);
  }

  _clickCloseButtonHandler(evt) {
    evt.preventDefault();

    this._callback.click();
    this.removeElement();
  }

  setInnerHandlers() {
    this.getElement()
    .querySelector(`.film-details__emoji-list`)
    .addEventListener(`change`, this._emojiClickHandler);

    this.getElement()
    .querySelector(`#watchlist`)
    .addEventListener(`change`, this._watchlistClickHandler);

    this.getElement()
      .querySelector(`#watched`)
      .addEventListener(`change`, this._watchedClickHandler);

    this.getElement()
    .querySelector(`#favorite`)
    .addEventListener(`change`, this._favoriteClickHandler);
  }

  setClosePopupClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, this._clickCloseButtonHandler);
  }

  restoreHandlers() {
    this.setClosePopupClickHandler(this._clickCloseButtonHandler);
    this.setInnerHandlers();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();

    this.updateData({isWatchlisted: !this._data.isWatchlisted}, true);
    this.changeFilmData(this._data);
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();

    this.updateData({isWatched: !this._data.isWatched}, true);
    this.changeFilmData(this._data);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();

    this.updateData({isFavorite: !this._data.isFavorite}, true);
    this.changeFilmData(this._data);
  }

  _emojiClickHandler(evt) {
    evt.preventDefault();
    this._emojiContainer = this.getElement().querySelector(`.film-details__add-emoji-label`);
    this._emoji = evt.target.value;
    this._createEmojiTemplate = () => {
      return `<img src="images/emoji/${this._emoji}.png" width="55" height="55" alt="emoji-${this._emoji}">`;
    };

    if (this._emojiContainer.getElementsByTagName(`img`)) {
      this._emojiContainer.innerHTML = ``;
    }
    renderTemplate(this._emojiContainer, this._createEmojiTemplate());
  }
}
