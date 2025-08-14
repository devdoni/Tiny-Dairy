import React, {useEffect} from "react"
import "../../styles/componets/ui/mood-picker.css";

const MoodPicker = ({ setDairyValue, dairyValue }) => {


  const moods = [
    { value: 5, label: "신남", emoji: "🤩" },
    { value: 4, label: "좋음", emoji: "😊" },
    { value: 3, label: "그냥 그래", emoji: "😐" },
    { value: 2, label: "살짝 다운", emoji: "😕" },
    { value: 1, label: "우울", emoji: "😢" },
  ];

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