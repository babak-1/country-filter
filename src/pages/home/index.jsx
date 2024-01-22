import { useCallback, useEffect, useState } from "react";
import Select from "../../components/SelectComp/select";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import "./style.css";
import CountryFilter from "../../components/CountryFilter/countryFilter";
import RankSlider from "../../components/RankFilter/rank";
import OrderingCountry from "../../components/OrderingCountry/orderingCountry";
const Home = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [searchParams, setSearchParams] = useSearchParams();
  const [sectors, setSectors] = useState([]);
  const [subSectors, setSubSectors] = useState([]);
  const [indicator, setIndicator] = useState([]);
  const [country, setCountry] = useState([]);
  const [years, setYears] = useState([]);
  const [sliderValue, setSliderValue] = useState([20, 50]);
  const [barCahrt, setBarCahrt] = useState([]);

  console.log(barCahrt, "barim");
  const fetchData = async (url, setState, params = {}) => {
    try {
      const response = await axios.get(url, { params });
      setState(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(`${BASE_URL}/sectors`, setSectors);
  }, [BASE_URL]);

  useEffect(() => {
    const sectorParam =
      searchParams.get("sector") || (sectors.length > 0 ? sectors[0] : "");

    fetchData(`${BASE_URL}/subsectors`, setSubSectors, { sector: sectorParam });
  }, [BASE_URL, searchParams, sectors]);

  useEffect(() => {
    const subSectorParam =
      searchParams.get("subsector") ||
      (subSectors.length > 0 ? subSectors[0] : "");

    fetchData(`${BASE_URL}/indicators`, setIndicator, {
      subsector: subSectorParam,
    });
  }, [BASE_URL, searchParams, subSectors]);

  useEffect(() => {
    const indicatorParam =
      searchParams.get("indicator") ||
      (indicator.length > 0 ? indicator[0] : "");

    fetchData(`${BASE_URL}/country`, setCountry, {
      indicator: indicatorParam,
    });
  }, [BASE_URL, indicator, searchParams]);

  useEffect(() => {
    const indicatorParam =
      searchParams.get("indicator") ||
      (indicator.length > 0 ? indicator[0] : "");

    const countryParam =
      searchParams.get("country") || (country.length > 0 ? country[0] : "");
    console.log(indicatorParam.replace(" ", ";"));
    fetchData(`${BASE_URL}/years`, setYears, {
      countries: countryParam.replaceAll(",", ";"),
      indicator: indicatorParam,
    });
  }, [BASE_URL, indicator, country, searchParams]);

  useEffect(() => {
    const indicatorParam =
      searchParams.get("indicator") ||
      (indicator.length > 0 ? indicator[0] : "");

    const yearsParams =
      searchParams.get("year") || (years.length > 0 ? years[0] : "");

    const countryParam =
      searchParams.get("country") || (country.length > 0 ? country[0] : "");
    if (indicatorParam && yearsParams && countryParam) {
      fetchData(`${BASE_URL}/bar-chart`, setBarCahrt, {
        countries: countryParam.replaceAll(",", ";"),
        indicator: indicatorParam,
        ranks: sliderValue[0] + "," + sliderValue[1],
        year1: yearsParams,
      });
    }
  }, [BASE_URL, country, indicator, searchParams, sliderValue, years]);

  const changeQueryParams = useCallback(
    (key, value) => {
      searchParams.set(key, value);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const handleSelectChange = (key, value) => {
    changeQueryParams(key, value);
  };

  const changeQueryParamsCountry = useCallback(
    (key, value) => {
      searchParams.set(key, value);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  const handleSelectChangeCountry = (key, value) => {
    changeQueryParamsCountry(key, value);
  };

  return (
    <div className="home-container">
      <div className="filter-wrapper">
        <CountryFilter
          label="Country"
          id="country"
          data={country}
          onChange={(value) => handleSelectChangeCountry("country", value)}
          value={searchParams.get("country") || ""}
        />
        <Select
          label="Years"
          id="years"
          data={years}
          onChange={(value) => handleSelectChange("year", value)}
          value={searchParams.get("year") || ""}
        />
        <Select
          label="Sector"
          id="sector"
          data={sectors}
          onChange={(value) => handleSelectChange("sector", value)}
          value={searchParams.get("sector") || ""}
        />
        <Select
          label="Subsector"
          id="subsector"
          data={subSectors}
          onChange={(value) => handleSelectChange("subsector", value)}
          value={searchParams.get("subsector") || ""}
        />
        <Select
          label="Indicator"
          id="indicator"
          data={indicator}
          onChange={(value) => handleSelectChange("indicator", value)}
          value={searchParams.get("indicator") || ""}
        />

        <RankSlider sliderValue={sliderValue} setSliderValue={setSliderValue} />
      </div>
      <OrderingCountry
        barchart={barCahrt}
        indicator={indicator}
        searchParams={searchParams}
      />
    </div>
  );
};

export default Home;
