import React from "react"
import "../styles/componets/home-main-content.css";
import Button from "./ui/Button";
import {useNavigate} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="home-main-content">
      <div className="home-main-content-container">
        <img src="/home-banner.gif" alt="홈 배너"/>
        <Button
          className="banner-btn"
          size="lg"
          variant="primary"
          children="일기 작성하기"
          onClick={() => navigate("/write")}
        />
      </div>
    </main>
  );
}

export default Home;