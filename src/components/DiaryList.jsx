import React, {useEffect, useState} from "react"
import {getCurrentUserDiary, getLoginedSessionId, getUserDairyDB} from "../utils/userStorage";
import {useNavigate} from "react-router-dom";


const DairyList = () => {

  const navigate = useNavigate();

  const [dairyList, setDairyList] = useState([]);

  useEffect(() => {
    if (getLoginedSessionId() === "") {
      alert('로그인 후 이용가능한 서비스입니다.');
      navigate("/login");
    } else {
      let currentUserDiary = getCurrentUserDiary();

      if (currentUserDiary !== null) {
        const diaryArray = Object.entries(currentUserDiary);
        setDairyList(diaryArray);
      }
      }
  }, []);


  return (
    <div className="diary-list-wrapper">
      <div className="dairy-list-contnet">
        <p>나의 일기 목록</p>
        <ul>
          {
            dairyList.map(([id, dairy]) => (
              <li key={id}>{dairy.title}</li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default DairyList;