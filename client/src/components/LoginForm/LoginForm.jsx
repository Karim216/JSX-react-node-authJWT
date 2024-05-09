import React, { Fragment } from "react";
import Button from "../Button/Button";
import LoginIcon from "../../assets/icons/login";

const LoginForm = ({ onInputChange, handleSubmit, state }) => {
  return (
    <main className="md:container m-auto flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="md:w-2/5 border border-gray-400 rounded-md p-10 relative"
      >
        <h2 className="text-center pb-10">Sign in to your account</h2>
        <Fragment>
          <label
            htmlFor="email"
            Email
            address
            className="block text-sm font-medium leading-6"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            onChange={(e) => onInputChange(e.target.value, "email", "emailErr")}
            value={state.email}
          />
          <p className="text-red-500">{state.emailErr}</p>
        </Fragment>
        <Fragment>
          <div className="flex items-center justify-between mt-10">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6"
            >
              Password
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            onChange={(e) =>
              onInputChange(e.target.value, "password", "passwordErr")
            }
            value={state.password}
          />
          <p className="text-red-500">{state.passwordErr}</p>
        </Fragment>
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
    </main>
  );
};

export default LoginForm;
