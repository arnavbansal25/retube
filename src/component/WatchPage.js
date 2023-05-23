import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";


const WatchPage = () => {
  const dispatch = useDispatch();

  // const params = useParams(); // this won't work becasue its not /watch/{id} but it is /watch?v={id}
  const [searchParams] = useSearchParams();
  console.log(searchParams);
  console.log(searchParams?.get("v"));

  useEffect(() => {
    dispatch(closeMenu());
  });

  return (
    <div className="px-5">
      <iframe
        width="1200"
        height="600"
        src={`https://www.youtube.com/embed/${searchParams?.get("v")}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default WatchPage;