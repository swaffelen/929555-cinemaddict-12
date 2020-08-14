import {createElement} from "../util.js";

const createFilmsListTemplate = (films) => {
  const noFilmsHeaderTemplate = `<h2 class="films-list__title">There are no movies in our database</h2>`;
  const defaultHeaderTemplate = `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`;
  return (
    `<section class="films-list">
      ${films.length ? defaultHeaderTemplate : noFilmsHeaderTemplate}
    </section>`
  );
};

export default class FilmsList {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return createFilmsListTemplate(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
