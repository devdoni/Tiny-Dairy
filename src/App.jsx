import React, {useEffect, useState} from "react"
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import {getLoginedSessionId} from "./utils/userStorage";
import DiaryWrite from "./components/DiaryWrite";
import DiaryList from "./components/DiaryList";
import DiaryDetail from "./components/DiaryDetail";

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(() => !!getLoginedSessionId());


  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUpForm />}></Route>
        <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}></Route>
        <Route path="/write" element={<DiaryWrite />} />
        <Route path="/list" element={<DiaryList />}></Route>
        <Route path="detail/:key" element={<DiaryDetail />}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;