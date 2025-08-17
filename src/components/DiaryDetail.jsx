import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { getLoginedSessionId, getSelectedDiary} from "../utils/userStorage";
import MoodPicker from "./ui/MoodPicker";
import "../styles/componets/diary-detail.css";
import Button from "./ui/Button";

const DiaryDetail = () => {

  const { key } = useParams();

  const navigate = useNavigate();

  const [selectedDairy, setSelectedDairy] = useState({});


  useEffect(() => {
    if (getLoginedSessionId() === "") {
      alert('로그인 후 이용가능한 서비스입니다.');
      navigate("/login");
    } else {
      let currentUserDiary = getSelectedDiary(key);

      if (currentUserDiary !== null) {
        setSelectedDairy(currentUserDiary);
      } else {
        alert('올바르지 않은 요청입니다.');
        navigate("/");
      }
    }
  }, []);


  return (
    <div className="diary-detail-wrapper">
      <div className="diary-detail-container">
        <p className="diary-detail-title">
          {selectedDairy.regDate?.slice(0,10)} 이 날의 기분은 이랬어요!
        </p>
        <MoodPicker dairyValue={selectedDairy}/>
        {
          selectedDairy !== null ? (
            <>
              <div className="diary-header">
                {selectedDairy.title}
              </div>
              <div className="diary-body">
                {selectedDairy.body}
              </div>
              <div className="diary-footer">
                <Button children="수정하기" className="fix-button" />
                <Button children="삭제하기" className="delete-button"/>
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