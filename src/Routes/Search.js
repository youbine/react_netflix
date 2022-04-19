import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import {
  multiSearch,
  getMovieCertification,
  getSeriesCertification,
  getMovieKeywords,
  getMovieDetails,
  getSeriesKeywords,
  getSeriesDetails,
} from "../api";
import { makeImagePath } from "../helper";
import { Loader } from "./Home";
import { Slider, Row, Box, BoxVariants } from "../Components/MovieSlide";
import MovieInfo from "../Components/MovieInfo";
import SeriesInfo from "../Components/SeriesInfo";
import SeriesModal from "../Components/SeriesModal";
import MovieModal from "../Components/MovieModal";

const SearchWrap = styled.div`
  height: 100vh;
  width: 100%;
  display: block;
  margin-top: 20vh;
`;

function Search() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [searchParmas, setSearchParams] = useSearchParams();
  //keywrod
  const keyword = searchParmas.get("keyword");
  const { data, isLoading } = useQuery(["search", "multi"], () =>
    multiSearch(`${keyword}`)
  );

  const mediaType = searchParmas.get("type");
  const [searchId, setSearchId] = useState("");
  const onBoxHover = (searchId) => {
    setSearchId(searchId);
  };
  const onBoxClicked = (searchId, mediaType) => {
    navigate(`/search?keyword=${keyword}&type=${mediaType}&id=${searchId}`);
  };

  //if it is movie
  const { data: MovieKeywords } = useQuery(["movie", "keyword", searchId], () =>
    getMovieKeywords(`${searchId}`)
  );
  const { data: MovieDetails } = useQuery(["movie", "details", searchId], () =>
    getMovieDetails(`${searchId}`)
  );
  const { data: MovieCertification } = useQuery(
    ["movie", "certification", searchId],
    () => getMovieCertification(`${searchId}`)
  );
  const MovieGenres = MovieDetails && MovieDetails.genres;
  const MovieRuntime = MovieDetails && MovieDetails.runtime;
  let MovieMaturityRating = [];

  for (let key in MovieCertification) {
    let obj = MovieCertification[key];
    for (let key in obj) {
      MovieMaturityRating = obj[key].certification;
    }
  }

  //if it is TV
  const { data: keywords } = useQuery(["series", "keyword", searchId], () =>
    getSeriesKeywords(`${searchId}`)
  );
  const { data: details } = useQuery(["series", "details", searchId], () =>
    getSeriesDetails(`${searchId}`)
  );
  const { data: certification } = useQuery(
    ["series", "certification", searchId],
    () => getSeriesCertification(`${searchId}`)
  );

  const genres = details && details.genres;
  const seasons = details && details.number_of_seasons;
  const maturityRating =
    certification && certification.find((iso) => iso.iso_3166_1 === "KR")
      ? certification.find((iso) => iso.iso_3166_1 === "KR").rating
      : null;

  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <SearchWrap>
            <Slider style={{ top: 0 }}>
              <Row
                key={index}
                style={{ gap: "3.75rem 5px", alignContent: "flex-start" }}
              >
                {data?.map((search) => (
                  <Box
                    key={search.id}
                    transition={{ type: "tween" }}
                    whileHover="hover"
                    initial="normal"
                    variants={BoxVariants}
                    bgphoto={makeImagePath(search.backdrop_path, "w500")}
                    onMouseEnter={() => {
                      onBoxHover(search.id);
                    }}
                    onClick={() => {
                      onBoxClicked(search.id, search.media_type);
                    }}
                  >
                    {search.media_type === "movie" ? (
                      <MovieInfo
                        maturityRating={MovieMaturityRating}
                        runtime={MovieRuntime}
                        genres={MovieGenres}
                        keywords={MovieKeywords}
                      />
                    ) : search.media_type === "tv" ? (
                      <SeriesInfo
                        maturityRating={maturityRating}
                        seasons={seasons}
                        genres={genres}
                        keywords={keywords}
                      />
                    ) : null}
                  </Box>
                ))}
              </Row>
            </Slider>
          </SearchWrap>

          {mediaType === "movie" ? (
            <MovieModal
              data={data}
              details={MovieDetails}
              maturityRating={MovieMaturityRating}
              runtime={MovieRuntime}
              genres={MovieGenres}
              keywords={MovieKeywords}
            />
          ) : mediaType === "tv" ? (
            <SeriesModal
              data={data}
              details={details}
              maturityRating={maturityRating}
              seasons={seasons}
              genres={genres}
              keywords={keywords}
            />
          ) : null}
        </>
      )}
    </>
  );
}

export default Search;
