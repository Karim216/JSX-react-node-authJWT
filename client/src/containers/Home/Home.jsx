import React, { Fragment, useEffect, lazy } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions/users/actionFetchUser";
import Loading from "../../components/Loading/Loading";

const Header = lazy(() => import("../../components/Header/Header"));
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
        navigate("/");
      });

      console.log("connexion")
  }, []);


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
  return currentUser.isLoading ? (<Loading />) : (
    <Fragment>
      <Header disconnect={handleDisconnect} />
      <Outlet />
    </Fragment>
  );
};

export default Home;
