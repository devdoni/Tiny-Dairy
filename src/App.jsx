import React from "react"
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import DiaryWrite from "./components/DiaryWrite";
import DiaryList from "./components/DiaryList";
import DiaryDetail from "./components/DiaryDetail";
import {AuthProvider} from "./context/AuthContext";
import MyInformation from "./components/MyInformation";
import PasswordChange from "./components/PasswordChange";

const App = () => {

  return (
    <AuthProvider>
      <Header/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/myinfo" element={<MyInformation />}/>
            <Route path="/write" element={<DiaryWrite />} />
            <Route path="/list" element={<DiaryList />} />
            <Route path="detail/:key" element={<DiaryDetail />}/>
            <Route path="/pwchange" element={<PasswordChange />} />
        </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;