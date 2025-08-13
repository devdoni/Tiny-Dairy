import React, {useEffect, useState} from "react"
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeMainContent from "./components/HomeMainContent";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import {getLoginedSessionId} from "./utils/userStorage";

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(() => !!getLoginedSessionId());


  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Routes>
        <Route path="/" element={<HomeMainContent />}></Route>
        <Route path="/signup" element={<SignUpForm />}></Route>
        <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;