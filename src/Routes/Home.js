import { makeImagePath, cutOverview } from "../helper";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSeries, getMovies } from "../api";
import styled from "styled-components";
import MovieSlide from "../Components/MovieSlide";
import SeriesSlide from "../Components/SeriesSlide";

export const Wrap = styled.div`
  background-color: black;
`;
export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Banner = styled.div`
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3.5rem;
`;
export const InfoWrap = styled.div`
  position: relative;
  top: 8rem;
  height: 33rem;
  width: 45rem;
  overflow: hidden;
`;
export const Title = styled.h2`
  font-size: 4rem;
  margin-bottom: 1.5rem;
`;
export const Overview = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  width: 100%;
  color: ${(props) => props.theme.white};
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const Buttons = styled.div`
  margin-top: 1rem;
  display: flex;
`;
export const Play = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.black};
  background-color: ${(props) => props.theme.white};
  width: 7.9rem;
  height: 2.9rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 5px;
  border: none;
  margin-right: 1rem;
  &:hover {
    opacity: 0.8;
  }
  svg {
    margin: 0 0rem 0 -1rem;
  }
`;
export const MoreInfo = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #636363;
  color: ${(props) => props.theme.white};
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 5px;
  border: none;
  width: 10.5rem;
  height: 2.9rem;
  &:hover {
    opacity: 0.8;
  }
  svg {
    margin: 0 0.5rem 0 -1rem;
  }
`;

function Home() {
  const navigate = useNavigate();
  const [randomBanner, setRandomBanner] = useState(0);
  useEffect(() => {
    setRandomBanner(Math.floor(0 + Math.random() * (18 - 0)));
  }, []);

  const moreInfoClick = (movieId) => {
    navigate(`?id=${movieId}`);
  };

  //Movie data
  const { data: popular, isLoading: loadMoviePopular } = useQuery(
    ["movie", "popular"],
    () => getMovies("", "", "", "")
  );
  const { data: actionMovie, isLoading: loadActionMovie } = useQuery(
    ["movie", "action"],
    () => getMovies(28, [233, 210024, 9715, 180547, 167316], 219404, "")
  );
  const { data: SFMovie, isLoading: loadSFMovie } = useQuery(
    ["movie", "SF"],
    () =>
      getMovies(
        878,
        [233, 210024, 9715, 4344, 180547, 167316],
        [2964, 4565],
        ""
      )
  );
  const { data: koreanMovie, isLoading: loadKoreanMovie } = useQuery(
    ["movie", "Korean"],
    () => getMovies("", 12354, 290327, "ko")
  );

  //Series data
  const { data: series, isLoading: loadSeries } = useQuery(
    ["series", "popular"],
    () => getSeries("", "", "", "en")
  );
  const { data: Kdrama, isLoading: loadKdrama } = useQuery(
    ["series", "Kdrama"],
    () => getSeries("", "", "", "ko")
  );
  const { data: food, isLoading: loadFood } = useQuery(["series", "food"], () =>
    getSeries("", [1918, 10637], [34137, 13141, 210024, 291483, 271, 14636], "")
  );
  const { data: koreanTalkShow, isLoading: loadkoreanTalkShow } = useQuery(
    ["series", "koreanTalkShow"],
    () => getSeries([10767, 10764], "", "", "ko")
  );
  const { data: crime } = useQuery(["series", "crime"], () =>
    getSeries(99, [10714, 33722], "", "en")
  );

  return (
    <Wrap>
      {loadMoviePopular &&
      loadActionMovie &&
      loadSFMovie &&
      loadKoreanMovie &&
      loadSeries &&
      loadKdrama &&
      loadFood &&
      loadkoreanTalkShow ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(popular[randomBanner].backdrop_path || "")}
          >
            <InfoWrap>
              <Title>{popular[randomBanner].title}</Title>
              <Overview>{cutOverview(popular[randomBanner].overview)}</Overview>
              <Buttons>
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
                <MoreInfo
                  onClick={() => {
                    moreInfoClick(popular[randomBanner].id);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2rem"
                    height="1.5rem"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                  </svg>
                  More Info
                </MoreInfo>
              </Buttons>
            </InfoWrap>
          </Banner>
          <MovieSlide title="Popular on Netflix" data={popular} />
          <MovieSlide title="Action Movies" data={actionMovie} />
          <MovieSlide title="SF & Blockbuster Action Movies" data={SFMovie} />
          <MovieSlide title="Korean Movies" data={koreanMovie} />
          <SeriesSlide title="Trending Now" data={series} />
          <SeriesSlide title="K-Drama" data={Kdrama} />
          <SeriesSlide title="Food Shows" data={food} />
          <SeriesSlide
            title="Korean Reality, Variety & Talk Show"
            data={koreanTalkShow}
          />
          <SeriesSlide title="True Crime Docuseries" data={crime} />
        </>
      )}
    </Wrap>
  );
}
export default Home;
