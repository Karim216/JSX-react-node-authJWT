import React, { useState } from "react";
import Button from "../../components/Button/Button";
import LoginIcon from "../../assets/icons/login";
import btnLoading from "../../assets/icons/btnLoading";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    email: "",
    emailErr: "",
    password: "",
    passwordErr: "",
  });

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
        const response = await axios.post(`http://localhost:8082/api/login`, {
          email: state.email.trim(),
          password: state.password.trim(),
        });

        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        navigate('/accueil');
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          email: '',
          password: '',
        }));
        // setErrors((prevErrors) => ({
        //   ...prevErrors,
        //   auth: 'Erreur d\'authentification ! Identifiant ou mot de passe incorrect',
        // }));
        console.log(error);
      }
    }
    console.log(state);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-2/5 border border-gray-300 rounded-md p-10">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              Email
              address
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) =>
                  inputChange(e.target.value, "email", "emailErr")
                }
                value={state.email}
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="text-red-500">{state.emailErr}</div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={(e) =>
                  inputChange(e.target.value, "password", "passwordErr")
                }
                value={state.password}
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Start a 14 day free trial
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
