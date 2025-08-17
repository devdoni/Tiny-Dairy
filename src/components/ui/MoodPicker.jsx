import React from "react"
import "../../styles/componets/ui/mood-picker.css";
import moods from "../../data/mood.json";
const MoodPicker = ({ setDairyValue, dairyValue }) => {

  const readOnly = !setDairyValue;

  const handlePick = (val) => {
    setDairyValue?.(prev => ({ ...prev, "mood": val }));
  }

  const selected = Number(dairyValue?.mood) || null;

  const visibleMoods = readOnly
  ? moods.filter(m => m.value === selected)
    : moods;

  return (
    <div className={`mood-picker ${readOnly ? "mood-picker--readonly" : ""}`}>
      {!readOnly && <p className="mood-title">오늘 하루 기분은 어땠나요?</p>}

      <ul>
        {visibleMoods.length > 0 ? (
          visibleMoods.map(mood => {
            const isActive = selected === mood.value;
            return (
              <li
                key={mood.value}
                className={`mood-item ${isActive ? "mood-active" : ""} ${readOnly ? "mood-item--readonly" : ""}`}
                onClick={() => !readOnly && handlePick(mood.value)}
                role={readOnly ? "img" : "radio"}
                aria-checked={readOnly ? undefined : isActive}
              >
                {mood.emoji} {mood.label}
              </li>
            );
          })
        ) : (
          readOnly && <li className="mood-item mood-none">기분 선택 안 함</li>
        )}
      </ul>
    </div>
  );
};

export default MoodPicker;