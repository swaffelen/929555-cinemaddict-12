const UserRank = {
  novice: `novice`,
  fan: `fan`,
  movieBuff: `movie buff`
};

const generateUserRank = (watched) => {
  switch (true) {
    case watched < 11:
      return UserRank.novice;
    case watched > 10 && watched < 21:
      return UserRank.fan;
    case watched > 20:
      return UserRank.movieBuff;
    default: return ``;
  }
};

export const createUserRankTemplate = (watched) => {
  const rank = generateUserRank(watched);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};
