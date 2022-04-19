import { useQuery } from "react-query";
import { getSeries } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeImagePath, cutOverview } from "../helper";
import {
  Banner,
  Buttons,
  Loader,
  MoreInfo,
  Overview,
  Play,
  Title,
  Wrap,
  InfoWrap,
} from "./Home";
import SeriesSlide from "../Components/SeriesSlide";

function Series() {
  const navigate = useNavigate();
  const [randomBanner, setRandomBanner] = useState(0);
  useEffect(() => {
    setRandomBanner(Math.floor(0 + Math.random() * (18 - 0)));
  }, []);

  const moreInfoClick = (seriesId) => {
    navigate(`?id=${seriesId}`);
  };

  const { data: series, isLoading: loadSeries } = useQuery(
    ["series", "popular"],
    () => getSeries("", "", "", "en")
  );
  const { data: Kdrama } = useQuery(["series", "Kdrama"], () =>
    getSeries("", "", "", "ko")
  );
  const { data: food } = useQuery(["series", "food"], () =>
    getSeries("", [1918, 10637], [34137, 13141, 210024, 291483, 271, 14636], "")
  );
  const { data: koreanTalkShow } = useQuery(["series", "koreanTalkShow"], () =>
    getSeries([10767, 10764], "", "", "ko")
  );
  const { data: crime } = useQuery(["series", "crime"], () =>
    getSeries(99, [10714, 33722], "", "en")
  );

  return (
    <Wrap>
      {loadSeries ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Banner bgphoto={makeImagePath(series[randomBanner].backdrop_path || "")}>
            <InfoWrap>
              <Title>{series[randomBanner].name}</Title>
              <Overview>{cutOverview(series[randomBanner].overview)}.</Overview>
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
                  재생
                </Play>
                <MoreInfo
                  onClick={() => {
                    moreInfoClick(series[randomBanner].id);
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
                  상세 정보
                </MoreInfo>
              </Buttons>
            </InfoWrap>
          </Banner>

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
export default Series;
