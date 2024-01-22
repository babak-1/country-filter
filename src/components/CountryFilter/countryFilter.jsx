import { useEffect, useState } from "react";
import "./style.css";
const CountryFilter = ({
  id,
  label,
  data = [],
  value = [],
  onChange = () => {},
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState(value);

  const handleMenuToggle = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  const handleCheckboxChange = (item) => {
    if (selectAll) {
      setSelectedCountries([]);
      setSelectAll(false);
    } else {
      if (selectedCountries.includes(item)) {
        setSelectedCountries((prevSelected) =>
          prevSelected.filter((country) => country !== item)
        );
      } else {
        setSelectedCountries((prevSelected) => [...prevSelected, item]);
      }
    }
  };

  useEffect(() => {
    onChange(selectedCountries);
  }, [selectedCountries]);

  const handleSelectAllChange = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll);
    setSelectedCountries(selectAll ? [] : data);
  };

  return (
    <div className="country-container">
      <label htmlFor={id} className="country-headding">
        {label}
      </label>
      <div className="option-container">
        <div className="option-header" onClick={handleMenuToggle}>
          <input
            type="text"
            className="option-header-input"
            readOnly
            value={selectedCountries}
          />
          <div className="arrow">&#9660;</div>
        </div>
        {menuOpen && (
          <ul className="ul">
            <li className="li">
              <span>Hamısını seç</span>
              <input
                type="checkbox"
                onChange={handleSelectAllChange}
                checked={selectAll}
              />
            </li>
            {data?.map((item, i) => (
              <li className="li" key={i}>
                <span>{item}</span>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(item)}
                  checked={selectedCountries.includes(item)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CountryFilter;
