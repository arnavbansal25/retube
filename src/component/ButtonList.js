import React, { useState, useEffect } from "react";
import { YT_VIDEO_CATEGORIES } from "../utils/contants";
import { useDispatch, useSelector } from "react-redux";
import { changeCategory } from "../utils/categorySlice";

const ButtonList = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (store) => store.category.selectedCategory
  );

  const [videoCategories, setVideoCategories] = useState([
    {
      kind: "youtube#videoCategory",
      id: "-1",
      snippet: {
        title: "All",
        assignable: true,
      },
    },
  ]);

  useEffect(() => {
    getVideoCategories();
  }, []);

  const getVideoCategories = async () => {
    const data = await fetch(YT_VIDEO_CATEGORIES);
    const json = await data.json();
    setVideoCategories([
      ...videoCategories,
      ...json.items.filter((val) => val?.snippet?.assignable),
    ]);
  };

  return (
    <div className="fixed left-6 md:left-[264px] right-6 flex justify-between gap-2 py-3 overflow-x-scroll bg-white">
      {videoCategories?.map((item) => (
        <div
          key={item?.id}
          className={
            "px-5 py-1 rounded-lg whitespace-nowrap cursor-pointer " +
            (selectedCategory?.id === item?.id
              ? "bg-selectedBlackBG text-white"
              : "bg-selectedGrayBG hover:bg-hoverGrayBG")
          }
          onClick={() =>
            dispatch(
              changeCategory({ id: item?.id, name: item?.snippet?.title })
            )
          }
        >
          {item?.snippet?.title}
        </div>
      ))}
    </div>
  );
};

export default ButtonList;
