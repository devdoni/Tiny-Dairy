import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getSelectedDiary, userDiaryDelete} from "../utils/userStorage";
import "../styles/componets/diary-detail.css";
import Button from "./ui/Button";
import log from "loglevel";
import {useAuth} from "../context/AuthContext";
import moods from "../data/mood.json";

const DiaryDetail = () => {

  const { key } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [selectedDairy, setSelectedDairy] = useState({});


  useEffect(() => {
    log.debug("[DiaryDetail] useEffect()");

    if (!isAuthenticated) {
      alert('로그인 후 이용가능한 서비스입니다.');
      navigate("/login");
    } else {
      let currentUserDiary = getSelectedDiary(key, user);

      if (currentUserDiary !== null) {
        setSelectedDairy(currentUserDiary);
      } else {
        alert('올바르지 않은 요청입니다.');
        navigate("/");
      }
    }
  }, [key, isAuthenticated, navigate, user]);

  const moodObj = moods.find((mood) => mood.value === Number(selectedDairy.mood));

  // 일기 수정 버튼 클릭핸들러
  const diaryModifyBtnClickHandler = () => {
    log.debug("[DiaryDetail] diaryModifyBtnClickHandler()");

    navigate(`/modify/${selectedDairy.key}`);
  }

  // 일기 삭제 버튼 클릭핸들러
  const diaryDeleteBtnClickHandler = () => {
    log.debug("[DiaryDetail] diaryDeleteBtnClickHandler()");

    if (window.confirm("정말 해당 일기를 삭제하시겠습니까?")) {

      if (userDiaryDelete(user, key)) {
        alert('일기 삭제가 완료되었습니다.');
        navigate("/list");

      } else {
        alert('죄송합니다 일기 삭제중 오류가 발생했습니다.');
        navigate("/list");
      }

    } else {
      alert('요청이 취소되었습니다.');
    }
  }

  return (
    <div className="diary-detail-wrapper">
      <div className="diary-detail-container">
        <div className="info-box">
          <p className="date-mood">
            Date. {selectedDairy.regDate?.slice(0, 10)}<br/>
            Mood. {moodObj ? `${moodObj.emoji}${moodObj.label}` : "알 수 없음"}
          </p>
        </div>

        {
          selectedDairy ? (
            <>
              <div className="diary-header">
                제목: {selectedDairy.title}
              </div>
              <div className="diary-body">
                {selectedDairy.body}
              </div>
              <div className="diary-footer">
                <Button
                  children="수정하기"
                  className="fix-button"
                  onClick={diaryModifyBtnClickHandler}
                />
                <Button
                  children="삭제하기"
                  className="delete-button"
                  onClick={diaryDeleteBtnClickHandler}
                />
              </div>
            </>
          ) : (
          <div>
          올바르지 않은 요청입니다.
          </div>
          )
        }
      </div>
    </div>
  )
}

export default DiaryDetail;