import RankView from "./view/user-rank.js";
import NavigationView from "./view/navigation.js";
import FooterStatisticsView from "./view/footer-statistic.js";
import MovieListPresenter from "./presenter/movie-list.js";
import {generateFilm} from "../src/mock/film.js";
import {countFiltersIndicators} from "../src/mock/filters.js";
import {render} from "../src/utils/render.js";

const FILMS_GRID_COUNT = 24;

const headerElement = document.querySelector(`.header`);
const main = document.querySelector(`.main`);
const footerStatistics = document.querySelector(`.footer__statistics`);

const films = Array.from({length: FILMS_GRID_COUNT}).map(generateFilm);
const filters = countFiltersIndicators(films);

const movieList = new MovieListPresenter(main, films);

render(new RankView(filters.watched), headerElement);
render(new NavigationView(filters), main);
render(new FooterStatisticsView(films), footerStatistics);

movieList.init();
