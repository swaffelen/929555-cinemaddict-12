import AbstractView from "./abstract.js";

export default class Smart extends AbstractView {
  constructor() {
    super();
  }

  updateElement() {
    let prevElement = this.getElement();

    const parent = prevElement.parentElement;
    this.removeElement();
    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    prevElement = null;

    this.restoreHandlers();
  }

  updateData(update, updateJustData) {
    if (!update) {
      return;
    }

    this._data = Object.assign({}, this._data, update);

    if (updateJustData) {
      return;
    }

    this.updateElement();
  }

  restoreHandlers() {
    throw new Error(`Abstract method not implemented: restoreHandlers`);
  }
}
