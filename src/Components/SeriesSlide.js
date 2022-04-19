import { AnimatePresence } from "framer-motion";
import { makeImagePath } from "../helper";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import SeriesModal from "./SeriesModal";
import {
  getSeriesKeywords,
  getSeriesDetails,
  getSeriesCertification,
} from "../api";
import { Slider, Row, Next, Prev, Box, BoxVariants } from "./MovieSlide";
import SeriesInfo from "./SeriesInfo";

function SeriesSlide({ data, title }) {
  const navigate = useNavigate();
  const seriesLocation = useLocation();
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const totalSeries = data?.length;
  const maxIndex = Math.floor(totalSeries / 6) - 1;
  const minIndex = 0;

  const onBoxClicked = (SeriesId) => {
    if (seriesLocation.pathname === "/series") {
      navigate(`/series?id=${SeriesId}`);
    } else {
      navigate(`/?id=${SeriesId}`);
    }
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

  //get Series keywords, genre
  const [seriesId, setSeriesId] = useState("");
  const onBoxHover = (seriesId) => {
    setSeriesId(seriesId);
  };

  const { data: keywords } = useQuery(["series", "keyword", seriesId], () =>
    getSeriesKeywords(`${seriesId}`)
  );
  const { data: details } = useQuery(["series", "details", seriesId], () =>
    getSeriesDetails(`${seriesId}`)
  );
  const { data: certification } = useQuery(
    ["series", "certification", seriesId],
    () => getSeriesCertification(`${seriesId}`)
  );
  const genres = details && details.genres;
  const seasons = details && details.number_of_seasons;
  const maturityRating = certification && certification.map((a) => a.rating);

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
                {data.slice(6 * index, 6 * index + 6).map((series) => (
                  <Box
                    layoutId={`${series.id}${title}`}
                    key={series.id}
                    transition={{ type: "tween" }}
                    whileHover="hover"
                    initial="normal"
                    variants={BoxVariants}
                    onClick={() => {
                      onBoxClicked(series.id);
                    }}
                    onMouseEnter={() => {
                      onBoxHover(series.id);
                    }}
                    bgphoto={makeImagePath(series.backdrop_path, "w500")}
                  >
                    <SeriesInfo
                      maturityRating={maturityRating}
                      seasons={seasons}
                      genres={genres}
                      keywords={keywords}
                    />
                  </Box>
                ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <SeriesModal data={data} title={title} />
        </>
      )}
    </>
  );
}
export default SeriesSlide;
