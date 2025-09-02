import {useEffect, useState} from "react";
import "../styles/componets/myinfomation.css";
import Input from "./ui/Input";
import Button from "./ui/Button";
import {useAuth} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {getMyInfo, setMyInfo} from "../utils/userStorage";
import log from "loglevel";

const MyInformation = () => {

  const { isAuthenticated, user, modifyUser } = useAuth();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);
  const [newUserInfo, setNewUserInfo] = useState({
    "id": "",
    "nickname": "",
    "password": "",
    "regDate": ""
  });


  useEffect(() => {
    log.debug("컴포넌트 마운트");
    if (!isAuthenticated) {
      alert('로그인 후 이용가능한 서비스입니다.');
      navigate('/login');
    } else {
      const info = getMyInfo(user.id);
      setUserInfo(info);
      setNewUserInfo({
        id: info?.id ?? "",
        nickname: info?.nickname ?? "",
        password: info?.password ?? "",
        regDate: info?.regDate ?? "",
      });
    }

  }, [navigate, isAuthenticated, user]);

  const nicknameChangeHandler = (e) => {
    log.debug("[MyInformation] nicknameChangeHandler");
    setNewUserInfo((prev) => ({ ...prev, nickname: e.target.value }));

  }

  const modifyButtonClickHandler = (e) => {
    e.preventDefault();

    if (newUserInfo.nickname === "") {
      alert('변경할 닉네임을 입력해주세요.');
      //포커스
    } else if (userInfo.nickname === newUserInfo.nickname) {
      alert('새로운 닉네임을 입력해주세요.');
      //포커스
    } else {

      // 로컬스토리지 정보 수정 로직
      try {
        let result = setMyInfo(newUserInfo);

        if (result) {
          alert('정보수정이 완료되었습니다.');
          modifyUser({ nickname: newUserInfo.nickname });
          navigate('/');

        } else {
          alert('죄송합니다 정보수정 처리중 오류가 발생했습니다.');
          navigate('/');
        }

      } catch (err) {
        log.warn("[MyInformation] Modify Error", err);
        alert('정보수정중 오류가 발생했습니다.');
        navigate("/");
      }
    }
  }

  return (
    <div className="information-wrapper">
      <div className="information-container">
        <div className="information-content">
          <table className="info-table">
            <tbody>
            <tr className="title-cell">
              <td colSpan="2"><p>내정보</p></td>
            </tr>
            <tr className="info-cell">
              <td>아이디</td>
              <td>
                {
                userInfo ? <Input className="info-input" value={userInfo.id} readOnly={true} disabled={true} /> : ""
                }
              </td>
            </tr>
            <tr className="info-cell">
              <td>닉네임</td>
              <td>
                {
                  userInfo ? <Input className="info-input" onChange={nicknameChangeHandler} value={newUserInfo.nickname} /> : ""
                }
              </td>
            </tr>
            <tr className="info-cell">
              <td>비밀번호</td>
              <td><Button pill={false} type="primary" children={"비밀번호 변경"} to="/pwchange"/></td>
            </tr>
            <tr className="info-cell">
              <td>가입일</td>
              <td>
                {
                  userInfo ? `${userInfo.regDate}` : ""
                }
              </td>
            </tr>
            <tr className="button-cell">
              <td colSpan="2">
                <Button pill={true} type="primary" onClick={modifyButtonClickHandler} children={"정보 수정"} className="user-modify-button"/>
                <Button pill={true} type="primary" children={"회원탈퇴"} className="user-delete-button"/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyInformation;
