import AbstractView from "./abstract.js";
import {SortType} from "../consts.js";

const createSortTemplate = () => {
  return `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
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
  }

  setClickHandler(callback) {
    this._callback.click = callback;

    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}

