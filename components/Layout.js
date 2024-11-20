import React from "react";
import Navbar from "./navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
