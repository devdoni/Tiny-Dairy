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

const App = () => {

  return (
    <AuthProvider>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUpForm />}></Route>
        <Route path="/login" element={<LoginForm />}></Route>

          <Route path="/write" element={<DiaryWrite />} />
          <Route path="/list" element={<DiaryList />}></Route>
          <Route path="detail/:key" element={<DiaryDetail />}/>

      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;