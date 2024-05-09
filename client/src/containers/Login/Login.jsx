import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ConfigContext } from "../../index.jsx";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { apiUrl, config } = useContext(ConfigContext);
  const [state, setState] = useState({
    email: "",
    emailErr: "",
    password: "",
    passwordErr: "",
  });

  // Fonction pour gérer les changements des inputs
  const inputChange = (value, name, errField) => {
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      [errField]: value ? "" : "This field is required",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(event)

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
        navigate("/");
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
    <LoginForm
      state={state}
      onInputChange={inputChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
