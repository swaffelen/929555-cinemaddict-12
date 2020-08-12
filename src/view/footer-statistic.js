import {createElement} from "../util.js";

const createFooterStatisticTemplate = (films) => {
  return (
    `<section class="footer__statistics">
      <p>${films.length} movies inside</p>
    </section>`
  );
};

export default class FooterStatistics {
  constructor(films) {
    this.films = films;
    this._element = null;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this.films);
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
