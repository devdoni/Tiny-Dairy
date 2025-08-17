import React, {useEffect, useState} from "react"
import {getLoginedSessionId, userDairySaved} from "../utils/userStorage";
import {useNavigate} from "react-router-dom";
import Input from "./ui/Input";
import "../styles/componets/diary-write.css";
import MoodPicker from "./ui/MoodPicker";
import Button from "./ui/Button";

const DiaryWrite = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (getLoginedSessionId() === "") {
      alert('로그인 후 이용가능한 서비스입니다.');
      navigate("/login");
    }
  });

  const [dairyValue, setDairyValue] = useState({
    "mood": "",
    "title": "",
    "body": "",
    "regDate": "",
    "modDate": ""
  });

  const writeValueChangeHandle = (e) => {
    const { name, value } = e.target;
    setDairyValue({...dairyValue, [name]: value });

  }

  const [titleWriteFlag, setTitleWriteFlag] = useState(false);

  const writeBtnHandle = () => {
    if (dairyValue.title === "") {
      alert('일기 제목을 입력해주세요.');

    } else if (dairyValue.body === "") {
      alert('일기 내용을 입력해주세요.');

    } else {
      if (userDairySaved(dairyValue)) {
        alert('일기를 저장이 완료되었습니다.');
        navigate("/list")

      } else {
        alert('죄송합니다 일기 저장중 오류가 발생했습니다.');
      }
    }
  }

  const titleKeyDownHandle = (e) => {
    setTitleWriteFlag(true);
  }

  return (
    <div className="diary-write-wrapper">
      <div className="diary-write-content">

      <MoodPicker setDairyValue={setDairyValue} dairyValue={dairyValue}/>
      {dairyValue.mood !== "" ? (
        <div className="dairy-write-box">
          <p className="dairy-title">오늘 하루를 제목으로 표현 한다면?</p>
          <Input placeholder="일기 제목을 입력해주세요" onChange={writeValueChangeHandle} value={dairyValue.title} name="title" className="dairy-title-input" onKeyDown={titleKeyDownHandle}/>
          {
            titleWriteFlag ? (
              <>
                <p className="dairy-title">오늘 하루에 대해 적어볼까요?</p>
                <textarea placeholder="일기 내용을 입력해주세요" onChange={writeValueChangeHandle} name="body"
                          value={dairyValue.body} className="dairy-title-textarea"/><br/>

                <Button pill={true} size="lg" onClick={writeBtnHandle} children="일기 작성하기" on
                        className="dairy-save-button"/>

              </>
            ) : null
          }

        </div>
      ) : null}

      </div>
    </div>
  );
}

export default DiaryWrite;
