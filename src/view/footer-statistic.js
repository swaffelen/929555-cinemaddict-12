import AbstractView from "./abstract.js";

const createFooterStatisticTemplate = (films) => {
  return (
    `<section class="footer__statistics">
      <p>${films.length} movies inside</p>
    </section>`
  );
};

export default class FooterStatistics extends AbstractView {
  constructor(films) {
    super();
    this.films = films;
  }

  getTemplate() {
    return createFooterStatisticTemplate(this.films);
  }
}
