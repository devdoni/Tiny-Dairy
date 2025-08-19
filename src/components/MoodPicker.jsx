import React from "react"
import "../styles/componets/mood-picker.css";
import moods from "../data/mood.json";
import log from "loglevel";
import {useAuth} from "../context/AuthContext";

const MoodPicker = ({ setDairyValue, dairyValue }) => {

  const { user } = useAuth();

  // 수정 모드가아닌 Detail 에서 접근했을때 ReadOnly 처리
  const readOnly = !setDairyValue;

  // Mood 클릭 핸들러
  const handlePick = (val) => {
    log.debug("[MoodPicker] handlePick()");
    setDairyValue?.(prev => ({ ...prev, "mood": val }));

    window.scroll({
      top: 150,
      behavior: "smooth",
    });

  }

  // dairyValue에 값이 있다면 selected에 값 대입 없으면 null
  const selected = Number(dairyValue?.mood) || null;

  // readOnly 일때 선택되었던 기분만 표시
  const visibleMoods = readOnly
  ? moods.filter(m => m.value === selected)
    : moods;

  return (
    <div className={`mood-picker ${readOnly ? "mood-picker--readonly" : ""}`}>
      {!readOnly && <p className="mood-title">
        {
          user.nickname ? `${user.nickname}님 오늘 하루 기분은 어땠나요?` : "오늘 하루 기분은 어땠나요?"
        }
      </p>
      }

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