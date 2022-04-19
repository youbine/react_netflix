import {
  motion,
  AnimatePresence,
  useViewportScroll,
  useTransform,
} from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import {
  makeImagePath,
  cutOverview,
  certificationRatings,
  timeCalculation,
} from "../helper";
import styled from "styled-components";
import { Buttons, Play, Overview } from "../Routes/Home";
import { Thumbs, MaturityNRuntime } from "./MovieInfo";
import {
  getCredits,
  getMovieKeywords,
  getMovieDetails,
  getMovieCertification,
} from "../api";

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
`;
export const Modal = styled(motion.div)`
  position: absolute;
  width: 55vw;
  height: 100vh;
  right: 0;
  left: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  z-index: 65;
`;
export const ModalCover = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.black};
`;
export const ModalPicture = styled.div`
  width: 100%;
  height: 50%;
  background-size: cover;
  background-position: center center;
`;
export const ModalTitle = styled(motion.h2)`
  font-size: 3rem;
  margin: -7rem 0 1.5rem 3rem;
  color: ${(props) => props.theme.white};
`;
export const ModalInfo = styled.div`
  width: 60%;
  height: 100%;
  padding: 2rem 4rem 0 3rem;
  position: absolute;
  left: 0;
  font-size: 1rem;
  span {
    font-size: 1rem;
    font-weight: 500;
    margin-right: 0.7rem;
  }
  img {
    height: 2rem;
    margin-right: 0.7rem;
  }
`;
export const ModalDetails = styled.div`
  text-transform: capitalize;
  width: 40%;
  height: 100%;
  position: absolute;
  right: 0;
  padding: 0 3rem 0 0;
  div {
    margin-bottom: 1rem;
  }
  span {
    &:last-child {
      span {
        display: none;
      }
    }
  }
  small {
    opacity: 0.6;
    font-size: 0.9rem;
  }
  i {
    font-style: italic;
    cursor: pointer;
  }
`;
export const Plus = styled.span`
  cursor: pointer;
  margin-right: 0.8rem;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;

function MovieModal({ data, title }) {
  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();
  const scrollYset = useTransform(scrollY, (value) => value + 50);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const movieClicked = id && data.find((movie) => String(movie.id) === id);

  const onOverlayClicked = () => {
    navigate(-1);
  };

  const { data: credits } = useQuery(["movie", "credits", id], () =>
    getCredits("movie", `${id}`)
  );
  const { data: keywords } = useQuery(["movie", "keyword", id], () =>
    getMovieKeywords(`${id}`)
  );
  const { data: details } = useQuery(["movie", "details", id], () =>
    getMovieDetails(`${id}`)
  );
  const { data: certification } = useQuery(["movie", "certification", id], () =>
    getMovieCertification(`${id}`)
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
    <AnimatePresence>
      {id && (
        <>
          <Overlay
            onClick={onOverlayClicked}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1, zIndex: 61 }}
          ></Overlay>
          <Modal style={{ top: scrollYset }} layoutId={`${id}${title}`}>
            {movieClicked && (
              <ModalCover>
                <ModalPicture
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), #141414), url(${makeImagePath(
                      movieClicked.backdrop_path,
                      "original"
                    )})`,
                  }}
                />
                <ModalTitle>{movieClicked.title}</ModalTitle>
                <Buttons
                  style={{
                    alignItems: "center",
                    margin: "0 0 4rem 3rem",
                  }}
                >
                  <Play>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="3rem"
                      height="3rem"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                    </svg>
                    Play
                  </Play>
                  <Plus>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2.5rem"
                      height="2.5rem"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                  </Plus>
                  <Thumbs>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2rem"
                      height="2rem"
                      fill="currentColor"
                      viewBox="-2 -2 20 20"
                    >
                      <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z" />
                    </svg>
                  </Thumbs>
                </Buttons>
                <ModalInfo>
                  <MaturityNRuntime style={{ height: "0%" }}>
                    <span style={{ fontSize: "1rem" }}>
                      {details && details.release_date
                        ? details.release_date.split("-")[0]
                        : null}
                    </span>
                    {certificationRatings(maturityRating)}
                    <span style={{ fontSize: "1rem" }}>
                      {timeCalculation(runtime)}
                    </span>
                  </MaturityNRuntime>
                  <Overview
                    style={{
                      paddingTop: "0.5rem",
                      margin: "0 auto",
                      fontSize: "1.1rem",
                    }}
                  >
                    {cutOverview(movieClicked.overview)}
                  </Overview>
                </ModalInfo>
                <ModalDetails>
                  <div>
                    <small>Cast: </small>
                    {credits &&
                      credits
                        .slice(0, 4)
                        .map((credit) => <span>{credit.name}, </span>)}
                    <i>more</i>
                  </div>
                  <div>
                    <small>Genres: </small>
                    {genres &&
                      genres.slice(0, 3).map((genre) => (
                        <span>
                          {genre.name}
                          <span>, </span>
                        </span>
                      ))}
                  </div>
                  <div>
                    <small>This movie is: </small>
                    {keywords &&
                      keywords.slice(0, 2).map((keyword) => (
                        <span>
                          {keyword.name}
                          <span>, </span>
                        </span>
                      ))}
                  </div>
                </ModalDetails>
              </ModalCover>
            )}
          </Modal>
        </>
      )}
    </AnimatePresence>
  );
}

export default MovieModal;
