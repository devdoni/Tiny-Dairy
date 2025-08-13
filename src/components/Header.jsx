import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../styles/componets/header.css";
const Header = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
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
                <li className="menu-item">로그아웃</li>
              ) : (
                <li className="menu-item">로그인</li>
              )
            }
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;