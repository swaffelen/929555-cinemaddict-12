export const countFiltersIndicators = (films) => {
  return {
    watchlisted: films.filter((film) => film.isWatchlisted).length,
    watched: films.filter((film) => film.isWatched).length,
    favorite: films.filter((film) => film.isFavorite).length
  };
};
