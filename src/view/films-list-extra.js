import {createElement} from "../util.js";

const createFilmsListExtraTemplate = (header) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${header}</h2>

      <div class="films-list__container"></div>
    </section>`
  );
};

export default class FilmsListExtra {
  constructor(header) {
    this._header = header;
    this._element = null;
  }

  getTemplate() {
    return createFilmsListExtraTemplate(this._header);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this.element = null;
  }
}
