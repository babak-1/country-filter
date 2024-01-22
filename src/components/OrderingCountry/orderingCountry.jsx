import "./style.css";

const OrderingCountry = ({ barchart, indicator = [], searchParams }) => {
  const indicatorParam =
    // eslint-disable-next-line react/prop-types
    searchParams.get("indicator") || (indicator.length > 0 ? indicator[0] : "");

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

              <div className="line-container">
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
