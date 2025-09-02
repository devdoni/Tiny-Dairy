import React, {useEffect, useRef, useState} from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";
import {Link, useNavigate} from "react-router-dom";
import "../styles/componets/password-change.css";
import {useAuth} from "../context/AuthContext";
import {changePassword} from "../utils/userStorage";
import log from "loglevel";

const PasswordChange = () => {

  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const [errors, setErrors] = useState({
    currentPassword: "현재 비밀번호를 입력해주세요.",
    newPassword: "새로운 비밀번호를 입력해주세요.",
    confirmNewPassword: "새로운 비밀번호를 한번 더 입력해주세요."
  });

  const inputRefs = useRef({});

  useEffect(() => {
    log.debug("[PasswordChange] useEffect()");

    if (!isAuthenticated) {
      alert('로그인 후 이용가능한 서비스입니다.');
      navigate("/login");
    }
  }, [isAuthenticated, navigate, user]);

  if (!isAuthenticated) return null;

  // 패스워드 Input 체인지 핸들러
  const passwordChangeHandler = (e) => {
    log.debug("[PasswordChange] passwordChangeHandler()");
    const {name, value}= e.target;
    let errorMsg = "";

    setPasswords({...passwords, [name]: value});
    if (name === "currentPassword" && value === "") {
      errorMsg = "현재 비밀번호를 입력해주세요.";
    }
    if (name === "newPassword" && value.length < 8) {
      errorMsg = "비밀번호는 최소 8자 이상이어야 합니다.";
    }

    if (name === "confirmNewPassword" && value !== passwords.newPassword) {
      errorMsg = "비밀번호가 일치하지 않습니다.";
    }

    setErrors({ ...errors, [name]: errorMsg });
  }

  // 비밀번호 변경 버튼 클릭핸들러
  const passwordChangeBtnClickHandler = async (e) => {
    log.debug("[PasswordChange] passwordChangeBtnClickHandler()");
    e.preventDefault();

    if (!errors.currentPassword && !errors.confirmNewPassword && !errors.newPassword) {
      let errMsg = await changePassword(user.id, passwords.currentPassword, passwords.newPassword, passwords.confirmNewPassword);
      switch (errMsg) {
        case "INVALID_VALUE": {
          alert('입력한 정보를 확인해주세요.');
          break;
        }
        case "MISMATCH": {
          alert('새 비밀번호가 일치하지 않습니다.');
          inputRefs.current.newPassword.focus();
          break;
        }
        case "WEAK_PASSWORD": {
          alert('비밀번호 조건이 충족되지 않았습니다.');
          inputRefs.current.newPassword.focus();
          break;
        }
        case "INVALID_OBJECT":
          case "UNKNOWN_ERROR" : {
            alert('죄송합니다 서버와 통신중 오류가 발생했습니다.');
            navigate("/");
            break;
        }
        case "INVALID_USER": {
          alert('존재하지 않는 유저입니다.');
          navigate("/");
          break;
        }
        case "INVALID_PASSWORD": {
          alert('입력한 비밀번호가 현재 비밀번호와 일치하지않습니다.');
          inputRefs.current.currentPassword.focus();
          break;
        }
        case "SUCCESS": {
          alert('비밀번호 변경이 완료되어 로그아웃됩니다.');
          logout();
          navigate("/");
          break;
        }
        default: {
          alert('알 수 없는 오류가 발생했습니다');
          navigate("/");
          break;
        }

      }
    } else {
      alert('입력한 비밀번호를 확인해주세요.');
    }
  }


  return (
    <div className="password-change-wrapper">
      <div className="password-change-container">
        <div className='password-change-content'>
          <h4>비밀번호 변경</h4>
          <form name="password-change" className="password-change-form">
            <Input
              label="현재 비밀번호"
              type="password"
              name="currentPassword"
              className="password-change-input"
              onChange={passwordChangeHandler}
              placeholder="현재 비밀번호를 입력해주세요."
              ref={(el) => (inputRefs.current.currentPassword = el)}
              error={errors.currentPassword ? errors.currentPassword : ""}
              required
            />
            <Input
              label="새 비밀번호"
              type="password"
              name="newPassword"
              className="password-change-input"
              onChange={passwordChangeHandler}
              placeholder="새로운 비밀번호를 입력해주세요"
              ref={(el) => (inputRefs.current.newPassword = el)}
              error={errors.newPassword ? errors.newPassword : ""}
              required
            />
            <Input
              label="새 비밀번호 확인"
              type="password"
              name="confirmNewPassword"
              className="password-change-input"
              onChange={passwordChangeHandler}
              placeholder="새로운 비밀번호를 한번 더 입력해주세요"
              error={errors.confirmNewPassword ? errors.confirmNewPassword : ""}
              ref={(el) => (inputRefs.current.confirmNewPassword = el)}
              required
            />
            <Button
              pill={true}
              type={'button'}
              children="비밀번호 변경"
              size="lg"
              variant="primary"
              onClick={passwordChangeBtnClickHandler}
              className="pw-change-button"
            />
            <Link to="/" className="home-nav"><h5>홈</h5></Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PasswordChange;