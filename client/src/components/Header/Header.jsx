import React from "react";
import { Link } from "react-router-dom";
import UserIcon from "../../assets/icons/user";

const Header = ({ data, disconnect, onHandleTheme, isDarkMode }) => {
  return (
    <header className="border-b border-gray-400 p-5">
      <nav className="container m-auto flex items-center justify-between">
        <h1>
          <Link to="/" className="text-3xl text-black dark:text-white font-bold">
            Logo
          </Link>
        </h1>
        <ul className="flex items-center justify-between gap-10">
          <li>
            <Link to="/articles" className="text-black dark:text-white">Articles</Link>
          </li>
          <li>
            <Link to="/users" className="text-black dark:text-white">Users</Link>
          </li>
          <li
            className="text-red-500 cursor-pointer"
            onClick={() => disconnect()}
            title="Disconnect"
          >
            Disconnect
          </li>
          <li>
            <button
              className="text-blue-500 cursor-pointer"
              onClick={() => onHandleTheme()}
              title="Change theme"
            >
              {isDarkMode ? "🌞" : "🌙"}
            </button>
          </li>
        </ul>
        <div
          className="text-blue-700 font-bold flex items-center gap-2"
          title={data.firstname + " " + data.lastname}
        >
          <div>
            <UserIcon color="#1d4ed8" />
          </div>{" "}
          {data.firstname + " " + data.lastname}
        </div>
      </nav>
    </header>
  );
};

export default Header;
