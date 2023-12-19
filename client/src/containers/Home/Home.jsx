import React, { Fragment, useEffect } from "react";
import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions/users/actionFetchUser";

const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
};

const Home = () => {

  const { currentUser } = useSelector((state) => state)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log(currentUser)

  useEffect(() => {
    getUser()(dispatch)
      .then((data) => {
        return;
        // console.log("Données utilisateur : ", data);
      })
      .catch((error) => {
        console.log("Erreur : ", error);
        handleDisconnect();
      });
  }, [dispatch]);


  const handleDisconnect = async () => {
    try {
      // const response = await axios.post(`http://localhost:8082/api/logout`, config);

      // console.log(response)
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
