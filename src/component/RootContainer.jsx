import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Head from "./Head";
import { useWindowSize } from "../utils/helper";

const RootContainer = () => {
  // const { width } = useWindowSize();
  // const c = width - 240;

  return (
    <>
      <Head />

      <div className="flex gap-2 mt-14">
        <Sidebar />
        <div className="w-full mx-6 md:ml-[264px]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootContainer;
