import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./components/Loading/Loading.jsx";
import "./App.css";

const Login = lazy(() => import("./containers/Login/Login.jsx"));
const Home = lazy(() => import("./containers/Home/Home.jsx"));
const Article = lazy(() => import("./containers/Home/Article/Article.jsx"));
const Users = lazy(() => import("./containers/Home/Users/Users.jsx"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />}>
            <Route index element={<Article />} />
            <Route path="/articles" element={<Article />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
