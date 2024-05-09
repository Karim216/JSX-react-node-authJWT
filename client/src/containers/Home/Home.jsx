import React, { useState, Fragment, useEffect, lazy } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions/users/actionFetchUser";
import Loading from "../../components/Loading/Loading";
import Footer from "../../components/Footer/Footer";

const Header = lazy(() => import("../../components/Header/Header"));
const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
};

const Home = () => {
  const { currentUser } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    getUser()(dispatch)
      .then((data) => {
        console.log("Données utilisateur : ", data);
      })
      .catch((error) => {
        console.log("Erreur : ", error);
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      setDarkMode(false);
    }
  }, []);

  const handleDisconnect = async () => {
    try {
      // const response = await axios.post(`http://localhost:8082/api/logout`, config);

      // console.log(response)
      localStorage.clear();
      localStorage.removeItem("accessToken");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleTheme = () => {
    if (localStorage.getItem("theme") === "light") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      setDarkMode(true);
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      setDarkMode(false);
      localStorage.setItem("theme", "light");
    }
  };
  return currentUser.isLoading ? (
    <Loading />
  ) : (
    <Fragment>
      <Header
        isDarkMode={darkMode}
        onHandleTheme={handleTheme}
        data={currentUser.data}
        disconnect={handleDisconnect}
      />
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default Home;
