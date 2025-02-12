import React from "react";
import Topbar from "../../components/topbar/Topbar";
import { Register } from "../../components/register/Register";
import Homeblogs from "../../components/home/Homeblogs";

const Home = () => {
  return (
    <div className="homeContainer">
      <Topbar />
      {/* <Register /> */}
      <Homeblogs />
    </div>
  );
};

export default Home;
