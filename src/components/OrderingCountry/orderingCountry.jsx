import { useState } from "react";
import "./style.css";

const OrderingCountry = ({ barchart, indicator = [], searchParams }) => {
  const [overMouse, setOverMouse] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [overMouseItem, setOverMouseItem] = useState(null);
  const indicatorParam =
    // eslint-disable-next-line react/prop-types
    searchParams.get("indicator") || (indicator.length > 0 ? indicator[0] : "");

  const handleMouseOver = (e, item) => {
    setOverMouse(true);
    setOverMouseItem(item);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseOut = () => {
    setOverMouse(false);
    setOverMouseItem(null);
  };

  const max = barchart?.max_amount;
  return (
    <div className="order-container">
      <div className="indicator-headding">{indicatorParam}</div>
      <div className="order-listing-container">
        <div className="listing-headding">
          <h3>Rank</h3>
          <h3>Country</h3>
        </div>
        <ul className="country-data-lists">
          {barchart?.countries_by_rank?.map((item, index) => (
            <li className="country-data-list" key={index}>
              <div className="little-cont">
                <span className="order-number">{item?.rank}</span>
                <div className="country-and-flag">
                  <span className="country-name">{item?.country}</span>
                  <img
                    src={`https://flagcdn.com/${item?.country_code_2.toLowerCase()}.svg`}
                    alt=""
                  />
                </div>
              </div>

              <div
                className="line-container"
                onMouseOver={(e) => handleMouseOver(e, item)}
                onMouseOut={handleMouseOut}
              >
                {overMouse && (
                  <div
                    style={{
                      position: "fixed",
                      left: position.x + 10,
                      top: position.y + 10,
                      background: "rgba(255, 255, 255, 0.8)",
                      padding: "10px",
                      width: "200px",
                      borderRadius: "5px",
                      zIndex: "4",
                    }}
                  >
                    <p>{overMouseItem?.country}</p>
                    <p>{overMouseItem?.year}</p>
                    <p>{overMouseItem?.rank}</p>
                  </div>
                )}
                <div
                  className="line"
                  style={{
                    width: `${(item?.amount / max) * 100}%`,
                  }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderingCountry;
