import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserIcon from "../../assets/icons/user";

const Header = ({ data, disconnect }) => {

  const [darkMode, setDarkMode] = useState(false);

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

  // Appliquer le thème dès que darkMode change
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

  const updateTheme = () => {
    setDarkMode(!darkMode);
    
  }
  return (
    <header className="border-b-2 border-gray-300 p-5">
      <nav className="container m-auto flex items-center justify-between">
        <h1>
          <Link to="/accueil" className="text-3xl text-blue-900 font-bold">
            Logo
          </Link>
        </h1>
        <ul className="flex items-center justify-between gap-10">
          <li>
            <Link to="/accueil/articles">Articles</Link>
          </li>
          <li>
            <Link to="/accueil/users">Users</Link>
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
              onClick={() => updateTheme()}
              title="Change theme"
            >
              {darkMode ? "🌞" : "🌙"}
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
