import AbstractView from "./abstract.js";

const UserRank = {
  novice: `novice`,
  fan: `fan`,
  movieBuff: `movie buff`
};

const generateUserRank = (filmsWatched) => {
  switch (true) {
    case filmsWatched < 11:
      return UserRank.novice;
    case filmsWatched > 10 && filmsWatched < 21:
      return UserRank.fan;
    case filmsWatched > 20:
      return UserRank.movieBuff;
    default: return ``;
  }
};

const createUserRankTemplate = (filmsWatched) => {
  const rank = generateUserRank(filmsWatched);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};


export default class Rank extends AbstractView {
  constructor(filmsWatched) {
    super();
    this._filmsWatched = filmsWatched;
  }

  getTemplate() {
    return createUserRankTemplate(this._filmsWatched);
  }
}
