import React, {useEffect, useState} from "react"
import {getCurrentUserDiary } from "../utils/userStorage";
import {useNavigate} from "react-router-dom";
import "../styles/componets/diary-list.css";
import moods from "../data/mood.json";
import {useAuth} from "../context/AuthContext";
import log from "loglevel";

const DairyList = () => {

  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const [diary, setDiary] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("all");

  useEffect(() => {
    log.debug("[DairyList] useEffect()");

    if (!isAuthenticated) {
      alert('로그인 후 이용가능한 서비스입니다.');
      navigate("/login");

    } else {
      let currentUserDiary = getCurrentUserDiary(user.id);

      if (currentUserDiary !== null) {
        setDiary(Object.entries(currentUserDiary));
      }
    }
  }, [isAuthenticated, navigate, user]);

  if (!isAuthenticated) return null;

  const dairyItemClickHandle = (selectedDairy) => {
    log.debug("[DairyList] dairyItemClickHandle()");

    navigate(`/detail/${selectedDairy.key}`);
  }

  return (
    <div className="diary-list-wrapper">
      <div className="dairy-list-content">
        <p className="diary-content-title">
          {
            user?.nickname ? `${user?.nickname}의 일기 목록` : "나의 일기 목록"
          }
        </p>
        <ul className="diary-list-menu">
          <li
            className={`diary-list-menu-item ${selectedMenu === "all" ? "list-menu-item-selected" : ""}`}
            onClick={() => setSelectedMenu("all")}
          >전체 일기
          </li>
          <li
            className={`diary-list-menu-item ${selectedMenu === "recent" ? "list-menu-item-selected" : ""}`}
            onClick={() => setSelectedMenu("recent")}
          >최근 일기
          </li>
        </ul>
          <table className="diary-list-table">
            <thead className="diary-list-header">
            <tr>
              <th className="diary-list-header-item">일기 제목</th>
              <th className="diary-list-header-item">기분</th>
              <th className="diary-list-header-item">일기 작성일</th>
              <th className="diary-list-header-item">일기 수정일</th>

            </tr>
            </thead>
            <tbody className="diary-list-body">
            {diary.length > 0 ? (
              diary.map(([id, diary]) => {
                  const moodObj = moods.find(m => m.value === diary.mood);

                  return (
                    <tr
                      key={id}
                      className="diary-list-body-tr"
                      onClick={() => dairyItemClickHandle(diary)}
                    >
                      <td className="diary-list-body-item">{diary.title}</td>
                      <td className="diary-list-body-item">
                        {moodObj ? `${moodObj.emoji} ${moodObj.label}` : "알 수 없음"}
                      </td>
                      <td className="diary-list-body-item">{diary.regDate}</td>
                      <td className="diary-list-body-item">{diary.modDate ? diary.modDate : "없음" }</td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan={3} className="diary-list-body-item empty">
                  작성된 일기가 없습니다.
                </td>
              </tr>
            )}
            </tbody>
          </table>
      </div>
    </div>
  );
}

export default DairyList;