import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const [selectedItem, setSelectedItem] = useState("Home");

  const sideBarItems = [
    { name: "Home", icon: "" },
    { name: "Trending", icon: "" },
    { name: "Music", icon: "" },
    { name: "Live", icon: "" },
  ];

  const somePopularChannelsORPlaylists = [

  ]

  if (!isMenuOpen) return null;

  return (
    <div
      className={`fixed flex min-w-[240px] max-w-[240px] max-h-[100vh] flex-col gap-0.5 px-6 py-4 overflow-y-scroll bg-white`}
    >
      {sideBarItems?.map((item, index) => (
        <Link
          key={index}
          to="/"
          className={
            "px-4 py-2 rounded-lg hover:bg-hoverGrayBG " +
            (selectedItem === item?.name && "bg-selectedGrayBG")
          }
          onClick={() => setSelectedItem(item?.name)}
        >
          Icon: {item?.name}
        </Link>
      ))}
      Add channels of your liking...
    </div>
  );
};

export default Sidebar;
