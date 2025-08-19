import React from "react";
import {Link, useNavigate} from "react-router-dom";
import "../styles/componets/header.css";
import {useAuth} from "../context/AuthContext";
import log from "loglevel";
const Header = () => {

  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const logoutBtnClickHandler = () => {
    log.debug("[Header] logoutBtnClickHandler()");
    logout();
    alert('로그아웃이 완료되었습니다.');
    navigate("/");

  }
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo-box">
          <Link to="/"><img className="logo" src="/logo.png" alt="로고 이미지"/></Link>
        </div>

        <div className="menu-box">
          <ul className="menu-bar">
            <Link to="/write"><li className="menu-item">일기 작성</li></Link>
            <Link to="/list"><li className="menu-item">일기 목록</li></Link>
            {
              isAuthenticated ? (
                <>
                  <Link to="/myinfo">
                    <li className="menu-item">
                      내정보
                    </li>
                  </Link>
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