import React, { useContext, useState, useEffect } from "react";
import Button from "../../components/Button/Button";
import LoginIcon from "../../assets/icons/login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import soleil from "../../assets/tendances/soleil.svg";
import crepuscule from "../../assets/tendances/crepuscule.svg";
import { ConfigContext } from "../../index.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { apiUrl, config } = useContext(ConfigContext);
  const [state, setState] = useState({
    email: "",
    emailErr: "",
    password: "",
    passwordErr: "",
  });
  const [darkMode, setDarkMode] = useState(false);

  // Appliquer le thème dès le chargement du composant
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

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    }
  }, [darkMode]);

  const inputChange = (value, name, errField) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      [errField]: value ? "" : "This field is required",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (state.email === "") {
      setState((prevState) => ({
        ...prevState,
        emailErr: "Email required",
      }));
    }

    if (state.password === "") {
      setState((prevState) => ({
        ...prevState,
        passwordErr: "Password required",
      }));
    }

    if (email && password) {
      try {
        const response = await axios.post(`${apiUrl}/login`, {
          email: state.email.trim(),
          password: state.password.trim(),
        });

        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        navigate("/accueil");
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          email: "",
          password: "",
        }));
        console.log(error);
      }
    }
    console.log(state);
  };

  return (
    <div className="md:container m-auto flex justify-center items-center h-screen">
      <div className="md:w-2/5 border border-gray-400 rounded-md pt-16 pb-10 px-10 relative">
        <img
          src={soleil}
          alt="Passer en mode jour"
          onClick={() => setDarkMode(!darkMode)}
          className="w-1/12 absolute top-5 right-5 cursor-pointer"
        />
        <h2 className="text-center">Sign in to your account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              Email
              address
              className="block text-sm font-medium leading-6"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                type="email"
                autoComplete="email"
                onChange={(e) =>
                  inputChange(e.target.value, "email", "emailErr")
                }
                value={state.email}
              />
              <div className="text-red-500">{state.emailErr}</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6"
              >
                Password
              </label>
              <div className="text-sm">
                <a href="#">Forgot password?</a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                onChange={(e) =>
                  inputChange(e.target.value, "password", "passwordErr")
                }
                value={state.password}
              />
              <div className="text-red-500">{state.passwordErr}</div>
            </div>
          </div>
          <Button
            label="Sign in"
            cssCustom={"mt-10"}
            icon={<LoginIcon color={"#FFFFFF"} />}
            iconLoading={<btnLoading />}
          />
          <p className="mt-10 text-center text-sm">
            Not a member? <a href="#">Start a 14 day free trial</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
