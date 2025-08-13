import React from "react";
import {Link} from "react-router-dom";
import "../styles/componets/header.css";
import {setLoginedSessionId} from "../utils/userStorage";
const Header = ({ isLoggedIn, setIsLoggedIn}) => {

  const logoutBtnClickHandler = () => {
    setIsLoggedIn(false);
    setLoginedSessionId("");

    alert('로그아웃이 완료되었습니다.');

  }
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo-box">
          <Link to="/"><img className="logo" src="/logo.png" alt="로고 이미지"/></Link>
        </div>

        <div className="menu-box">
          <ul className="menu-bar">
            <li className="menu-item">일기 작성</li>
            <li className="menu-item">일기 목록</li>
            {
              isLoggedIn ? (
                <>
                  <Link to="/signup"><li className="menu-item">내정보</li></Link>
                  <li className="menu-item" onClick={logoutBtnClickHandler}>로그아웃</li>
                </>
                  ) : (
                <>
                <Link to="/login"><li className="menu-item">로그인</li></Link>
                <Link to="/signup"><li className="menu-item">회원가입</li></Link>
                </>
              )
            }
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;