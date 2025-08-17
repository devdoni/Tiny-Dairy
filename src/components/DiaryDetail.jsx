import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { getLoginedSessionId, getSelectedDiary} from "../utils/userStorage";
import MoodPicker from "./ui/MoodPicker";


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
    <div>
      <MoodPicker />
      {
        selectedDairy !== null ? (
          <>
            <div className="diary-header">
              {selectedDairy.title}
            </div>
            <div className="diary-body">
              {selectedDairy.body}
            </div>
          </>
        ) : (
          <div>
            올바르지 않은 요청입니다.
          </div>
        )
      }

    </div>
  )
}

export default DiaryDetail;