import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { home, home_black, trending, trending_black } from "../assets";

const Sidebar = () => {
  const navigate = useNavigate();

  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const [selectedItem, setSelectedItem] = useState("Home");

  const sideBarItems = [
    {
      name: "Home",
      icon: home,
      iconBlack: home_black,
    },
    { name: "Trending", icon: trending, iconBlack: trending_black },
    { name: "Music", icon: "" },
    { name: "Live", icon: "", to: "/results?search_query=live" },
  ];

  const isSelected = (itemName) => {
    return selectedItem === itemName;
  };

  const somePopularChannelsORPlaylists = [];

  if (!isMenuOpen) return null;

  return (
    <div
      className={`flex min-w-[240px] max-w-[240px] max-h-[100vh] flex-col gap-0.5 px-6 py-4 overflow-y-scroll bg-white`}
    >
      {sideBarItems?.map((item, index) => (
        <Link
          key={index}
          to={item.to || "/"}
          className={
            "flex items-center px-4 py-2 rounded-lg hover:bg-hoverGrayBG " +
            (isSelected(item?.name) && "bg-selectedGrayBG")
          }
          onClick={() => setSelectedItem(item?.name)}
        >
          <img
            src={isSelected(item?.name) ? item.iconBlack : item.icon}
            alt={item.name}
            className="w-6"
          />
          <div>{item?.name}</div>
        </Link>
      ))}
      Add channels of your liking...
    </div>
  );
};

export default Sidebar;
