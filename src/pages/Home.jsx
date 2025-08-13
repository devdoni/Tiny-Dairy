import react from 'react';
import {Link} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomeMainContent from "../components/HomeMainContent";

const Home = () => {
  return (
    <>
      <Header />
      <HomeMainContent />
      <Footer />
    </>
  );
}

export default Home;