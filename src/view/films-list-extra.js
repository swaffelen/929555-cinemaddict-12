import AbstractView from "./abstract";

const createFilmsListExtraTemplate = (header) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${header}</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsListExtra extends AbstractView {
  constructor(header) {
    super();
    this._header = header;
  }

  getTemplate() {
    return createFilmsListExtraTemplate(this._header);
  }
}
