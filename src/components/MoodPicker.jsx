import { useAuth } from "../context/AuthContext";
import moods from "../data/mood.json";
import log from "loglevel";
import "../styles/componets/mood-picker.css";

const MoodPicker = ({ setDairyValue, dairyValue }) => {
  const { user } = useAuth();

  // Mood 클릭 핸들러
  const handlePick = (val) => {
    log.debug("[MoodPicker] handlePick()");
    setDairyValue?.((prev) => ({ ...prev, mood: val }));

    window.scroll({
      top: 150,
      behavior: "smooth",
    });
  };

  // 선택된 기분
  const selected = Number(dairyValue?.mood) || null;

  return (
    <div className="mood-picker">
      <p className="mood-title">
        {user?.nickname
          ? `${user?.nickname}님 오늘 하루 기분은 어땠나요?`
          : "오늘 하루 기분은 어땠나요?"}
      </p>

      <ul>
        {moods.map((mood) => {
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
          );
        })}
      </ul>
    </div>
  );
};

export default MoodPicker;