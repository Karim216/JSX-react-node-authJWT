import React, { Fragment } from "react";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <header>
        <h1>Logo</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
      {children}
      <footer>
        <ul>
          <li>Lorem, ipsum.</li>
          <li>Iusto, unde?</li>
          <li>Ipsa, iste.</li>
          <li>Mollitia, a?</li>
        </ul>
      </footer>
    </Fragment>
  );
};

export default Layout;
