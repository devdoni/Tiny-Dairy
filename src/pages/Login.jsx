import React from "react"
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";

const Login = ({ isLoggedIn, setIsLoggedIn}) => {
  return (
    <>
      <Header/>
      <LoginForm />
      <Footer />
    </>
  )
}

export default Login;