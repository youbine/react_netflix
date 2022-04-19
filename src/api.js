const API_KEY = `${process.env.REACT_APP_API_KEY}`;
const BASE_URL = "https://api.themoviedb.org/3/";

//Movie
export function getMovies(
  genre,
  withoutkeywords,
  withKeywords,
  originalLanguage
) {
  return fetch(
    `${BASE_URL}movie/popular?api_key=${API_KEY}&with_genres=${genre}&with_keywords=${withKeywords}&without_keywords=${withoutkeywords}&with_original_language=${originalLanguage}`
  )
    .then((response) => response.json())
    .then((json) => json.results);
}
export function getMovieDetails(movieId) {
  return fetch(`${BASE_URL}movie/${movieId}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getMovieKeywords(movieId) {
  return fetch(`${BASE_URL}movie/${movieId}/keywords?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((json) => json.keywords);
}
export function getMovieCertification(movieId) {
  return fetch(`${BASE_URL}movie/${movieId}/release_dates?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((json) =>
      json.results
        .filter(
          (result) => result.iso_3166_1 === "KR" || result.iso_3166_1 === "US"
        )
        .map((r) => r.release_dates)
    );
}
//Series
export function getSeries(
  genre,
  withKeywords,
  withoutkeywords,
  originalLanguage
) {
  return fetch(
    `${BASE_URL}tv/popular?api_key=${API_KEY}&with_genres=${genre}&with_keywords=${withKeywords}&without_keywords=${withoutkeywords}&with_original_language=${originalLanguage}&include_adult=true`
  )
    .then((response) => response.json())
    .then((json) =>
      json.results.filter((result) => result.backdrop_path != null)
    );
}
export function getSeriesDetails(seriesId) {
  return fetch(`${BASE_URL}tv/${seriesId}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
export function getSeriesKeywords(seriesId) {
  return fetch(`${BASE_URL}tv/${seriesId}/keywords?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((json) => json.results);
}
export function getSeriesCertification(seriesId) {
  return fetch(`${BASE_URL}tv/${seriesId}/content_ratings?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((json) =>
      json.results.filter(
        (result) => result.iso_3166_1 === "KR" || result.iso_3166_1 === "US"
      )
    );
}

export function getCredits(contentsType, id) {
  return fetch(`${BASE_URL}${contentsType}/${id}/credits?api_key=${API_KEY}`)
    .then((response) => response.json())
    .then((json) => json.cast);
}

export function multiSearch(query) {
  return fetch(
    `${BASE_URL}search/multi?api_key=${API_KEY}&query=${query}&include_adult=true`
  )
    .then((response) => response.json())
    .then((json) =>
      json.results.filter((result) => result.backdrop_path != null)
    );
}
