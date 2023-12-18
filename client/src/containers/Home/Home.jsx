import React, { Fragment } from "react";
import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const handleDisconnect = async () => {
    try {
      const response = await axios.post(`http://localhost:8082/api/logout`);

      console.log(response)
      localStorage.clear();
      localStorage.removeItem("accessToken");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <Header disconnect={handleDisconnect} />
      <Outlet />
    </Fragment>
  );
};

export default Home;
