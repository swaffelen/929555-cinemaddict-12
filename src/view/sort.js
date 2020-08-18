import AbstractView from "./abstract.js";
import {SortType} from "../consts.js";

const activeSortClass = `sort__button--active`;

const createSortTemplate = () => {
  return `<ul class="sort">
      <li><a href="#" class="sort__button ${activeSortClass}" data-sort-type="${SortType.BY_DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.BY_RATING}">Sort by rating</a></li>
    </ul>`;
};

export default class Sort extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _clickHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.click(evt.target.dataset.sortType);
    this.getElement()
      .querySelectorAll(`a`)
      .forEach((filter) => filter.classList.remove(activeSortClass));

    evt.target.classList.add(activeSortClass);
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}

