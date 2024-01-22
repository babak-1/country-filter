import { useState } from "react";
import "./style.css";
const Select = ({ id, label, data = [], value = "", onChange = () => {} }) => {
  const [selected, setSelected] = useState(value);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setSelected(selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="select-wrapper">
      <label htmlFor={id} className="headding">
        {label}
      </label>
      <div className="option-cont">
        <select
          id={id}
          onChange={handleChange}
          value={selected}
          className="select"
        >
          {data?.length > 0 ? (
            data.map((item, i) => (
              <option value={item} key={i} className="option">
                {item}
              </option>
            ))
          ) : (
            <option disabled value="" className="option">
              No options available
            </option>
          )}
        </select>
      </div>
    </div>
  );
};

export default Select;
