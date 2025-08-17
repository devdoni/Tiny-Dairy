import React from "react"
import "../../styles/componets/ui/mood-picker.css";
import moods from "../../data/mood.json";
const MoodPicker = ({ setDairyValue, dairyValue }) => {

  const handlePick = (val) => {
    setDairyValue(prev => ({ ...prev, "mood": val }));
  }

  const selected = Number(dairyValue?.mood) || null;


  return (
    <div className="mood-picker">
      <p className="mood-title">오늘 하루 기분은 어땠나요?</p>
      <ul>
        {moods.map(mood => {
          const isActive = selected === mood.value;
          return (
            <li
              key={mood.value}
              className={`mood-item ${isActive ? "mood-active" : ""}`}
              onClick={() => handlePick(mood.value)}
              role="radio"
              aria-checked={isActive}
            >
              {mood.emoji} {mood.label}
            </li>
          )
        })}
      </ul>
  </div>
  );
};

export default MoodPicker;