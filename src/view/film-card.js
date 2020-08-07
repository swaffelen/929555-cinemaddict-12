export const createFilmCardTemplate = (movie) => {
  const {title, poster, description, comments, rating,
    release, genres, runtime, isWatchlisted, isWatched, isFavorite} = movie;

  const inspectFlag = (flag) => {
    return flag ? `film-card__controls-item--active` : ``;
  };
  const year = release.getFullYear();
  return (
    `<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${runtime}</span>
            <span class="film-card__genre">${genres[0]}</span>
          </p>
          <img src="./${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description.length > 140 ? `${description.substr(0, 139)}...` : description}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${inspectFlag(isWatchlisted)}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${inspectFlag(isWatched)}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${inspectFlag(isFavorite)}">Mark as favorite</button>
          </form>
    </article>`
  );
};
