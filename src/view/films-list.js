import AbstractView from "./abstract";

const createFilmsListTemplate = (films) => {
  const noFilmsHeaderTemplate = `<h2 class="films-list__title">There are no movies in our database</h2>`;
  const defaultHeaderTemplate = `<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>`;
  return (
    `<section class="films-list">
      ${films.length ? defaultHeaderTemplate : noFilmsHeaderTemplate}
    </section>`
  );
};

export default class FilmsList extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFilmsListTemplate(this._films);
  }
}
