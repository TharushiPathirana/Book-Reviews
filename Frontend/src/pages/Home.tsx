import React from "react";
import { TopNavbar } from "../components/TopNavbar2";
import { SearchBar } from "../components/SearchBar";
import { Card } from "../components/Card";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <TopNavbar />
      <SearchBar />
      <Card />
    </>
  );
};

export default Home;
