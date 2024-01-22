import { Slider, Space } from "antd";
import "./style.css";
const RankSlider = ({ sliderValue, setSliderValue }) => {
  const handleSliderChange = (value) => {
    const [newValue0, newValue1] = value;

    const updatedValue0 = Math.max(newValue0, 0);
    const updatedValue1 = Math.max(newValue1, 0);

    if (updatedValue1 === 0) {
      setSliderValue([0, 0]);
    } else if (updatedValue0 + 1 < updatedValue1) {
      setSliderValue([updatedValue0, updatedValue1]);
    } else {
      setSliderValue([updatedValue1 - 1, updatedValue1]);
    }
  };
  return (
    <div className="rank-container">
      <input
        className="count-box"
        type="number"
        readOnly
        value={sliderValue[0]}
      />
      <span className="min-value">Min 1</span>
      <Space
        style={{
          width: "100%",
        }}
        direction="vertical"
      >
        <Slider
          range={{
            draggableTrack: true,
          }}
          defaultValue={[20, 50]}
          value={sliderValue}
          onChange={handleSliderChange}
          style={{ color: "red" }}
        />
      </Space>
      <input
        className="count-box"
        type="number"
        readOnly
        value={sliderValue[1]}
      />
      <span className="max-value">Max 100</span>
    </div>
  );
};

export default RankSlider;
