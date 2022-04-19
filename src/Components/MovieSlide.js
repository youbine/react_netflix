import { motion, AnimatePresence } from "framer-motion";
import { makeImagePath } from "../helper";
import { useState } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import MovieModal from "./MovieModal";
import MovieInfo from "./MovieInfo";
import {
  getMovieKeywords,
  getMovieDetails,
  getMovieCertification,
} from "../api";

export const Slider = styled.div`
  width: 100%;
  height: 15rem;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 4rem;
  position: relative;
  top: -6.25rem;
  h4 {
    margin-left: 3rem;
  }
`;
export const Row = styled(motion.div)`
  position: absolute;
  display: grid;
  align-content: center;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  height: 8.2rem;
  padding: 0 3rem;
  color: ${(props) => props.theme.white};
  @media screen and (min-width: 1700px) {
    height: 9rem;
  }
  @media screen and (min-width: 1900px) {
    height: 10rem;
  }
  @media screen and (min-width: 2000px) {
    height: 11rem;
  }
`;
export const Next = styled.div`
  cursor: pointer;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  width: 3rem;
  right: 0;
  height: 8.2rem;
  z-index: 50;
  color: ${(props) => props.theme.white};
  @media screen and (min-width: 1700px) {
    height: 9rem;
  }
  @media screen and (min-width: 1900px) {
    height: 10rem;
  }
  @media screen and (min-width: 2000px) {
    height: 11rem;
  }
  svg {
    height: 100%;
    &:hover {
      width: 80%;
      transition: 0.3s;
    }
  }
`;
export const Prev = styled(Next)`
  left: 0;
`;
export const Box = styled(motion.div)`
  font-weight: normal;
  cursor: pointer;
  border-radius: 5px;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 8.2rem;
  width: 100%;
  @media screen and (min-width: 1700px) {
    height: 9rem;
  }
  @media screen and (min-width: 1900px) {
    height: 10rem;
  }
  @media screen and (min-width: 2000px) {
    height: 11rem;
  }
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
export const BoxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 60,
    scale: 1.4,
    y: -50,
    transition: { delay: 0.5, type: "tween", duration: 0.3 },
 
  },
};

function MovieSlide({ data, title }) {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const totalMovies = data?.length;
  const maxIndex = Math.floor(totalMovies / 6) - 1;
  const minIndex = 0;

  const onBoxClicked = (movieId) => {
    navigate(`?id=${movieId}`);
  };

  const increaseIndex = () => {
    if (leaving) return;
    setLeaving(true);
    setPrev(false);
    setIndex((prev) => (prev === maxIndex ? minIndex : prev + 1));
  };
  const decreaseIndex = () => {
    if (leaving) return;
    setLeaving(true);
    setPrev(true);
    setIndex((prev) => (prev === minIndex ? maxIndex : prev - 1));
  };

  const RowVariants = {
    enter: (prev) => ({
      x: prev ? -window.innerWidth : window.innerWidth,
    }),
    visible: {
      x: 0,
    },
    exit: (prev) => ({
      x: prev ? window.innerWidth : -window.innerWidth,
    }),
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  //get movie keywords, genre
  const [movieId, setMovieId] = useState("");
  const onBoxHover = (movieId) => {
    setMovieId(movieId);
  };

  const { data: keywords } = useQuery(["movie", "keyword", movieId], () =>
    getMovieKeywords(`${movieId}`)
  );
  const { data: details } = useQuery(["movie", "details", movieId], () =>
    getMovieDetails(`${movieId}`)
  );
  const { data: certification } = useQuery(
    ["movie", "certification", movieId],
    () => getMovieCertification(`${movieId}`)
  );

  const genres = details && details.genres;
  const runtime = details && details.runtime;
  let maturityRating = "";

  for (let key in certification) {
    let obj = certification[key];
    for (let key in obj) {
      maturityRating = obj[key].certification;
    }
  }

  return (
    <>
      {data && (
        <>
          <Slider>
            <h4>{title}</h4>
            <Prev onClick={decreaseIndex}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </Prev>
            <Next onClick={increaseIndex}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                fill="currentColor"
                viewBox="-5 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                />
              </svg>
            </Next>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={prev}
            >
              <Row
                custom={prev}
                variants={RowVariants}
                initial="enter"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data.slice(6 * index, 6 * index + 6).map((movie) => (
                  <Box
                    layoutId={`${movie.id}${title}`}
                    key={movie.id}
                    transition={{ type: "tween" }}
                    whileHover="hover"
                    initial="normal"
                    variants={BoxVariants}
                    onClick={() => {
                      onBoxClicked(movie.id);
                    }}
                    onMouseEnter={() => {
                      onBoxHover(movie.id);
                    }}
                    bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                  >
                    <MovieInfo
                      maturityRating={maturityRating}
                      runtime={runtime}
                      genres={genres}
                      keywords={keywords}
                    />
                  </Box>
                ))}
              </Row>
            </AnimatePresence>
          </Slider>

          <MovieModal data={data} title={title} />
        </>
      )}
    </>
  );
}
export default MovieSlide;
