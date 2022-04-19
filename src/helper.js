import MovieInfo from "./Components/MovieInfo";
import SeriesInfo from "./Components/SeriesInfo";

export function makeImagePath(id, format) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export function timeCalculation(runtime) {
  const hours = Math.floor(`+${runtime}` / 60);
  const minutes = `+${runtime}` % 60;
  if (minutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${minutes}m`;
  }
}

export function cutOverview(overview) {
  const length = `${overview}`.split(".").length - 1;
  if (length > 3) {
    return `${overview}`.split(".", 3).join(".");
  } else {
    return `${overview}`;
  }
}
export function certificationRatings(maturityRating) {
  if (
    ["ALL", "TV-Y", "TV-Y7", "TV-G"].includes(`${maturityRating}`) ||
    `+${maturityRating}` < 12 ||
    `${maturityRating}` === "PG"
  ) {
    return (
      <img
        src="https://help.nflxext.com/3a33f636-ea6c-4b48-8894-318589e5ef52_icon_ratings_KR_All_en.png"
        alt="rating"
      />
    );
  } else if (["12", "TV-PG"].some((f) => `${maturityRating}`.includes(f))) {
    return (
      <img
        src="https://help.nflxext.com/0fca6f3e-46ee-46d8-8157-255779f948dc_icon_ratings_KR_12_en.png"
        alt="rating"
      />
    );
  } else if (
    ["15", "TV-14", "PG-13"].some((f) => `${maturityRating}`.includes(f))
  ) {
    return (
      <img
        src="https://help.nflxext.com/0dc019eb-c04b-4509-91ab-583617865be3_icon_ratings_KR_15_en.png"
        alt="rating"
      />
    );
  } else if (
    `+${maturityRating}` >= 18 ||
    ["불가", "TV-MA", "R", "NC-17"].some((f) => `${maturityRating}`.includes(f))
  ) {
    return (
      <img
        src="https://help.nflxext.com/4647fc55-bce8-4c8c-9b08-4d1c211073a9_icon_ratings_KR_R_en.png"
        alt="rating"
      />
    );
  } else {
    return <span>Sorry, No Info🧐</span>;
  }
}
