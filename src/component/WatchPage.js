import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import { LIVE_CHAT_MSGS, LIVE_YT, YOUTUBE_VIDEOS_API } from "../utils/contants";

const WatchPage = () => {
  const dispatch = useDispatch();

  // const params = useParams(); // this won't work becasue its not /watch/{id} but it is /watch?v={id}
  const [searchParams] = useSearchParams();
  const [videoDetails, setVideoDetails] = useState([]);
  const [liveChatId, setLiveChatId] = useState(undefined);

  const videoId = searchParams?.get("v");

  useEffect(() => {
    dispatch(closeMenu());

    getVideoDetails();
  });

  const getVideoDetails = async () => {
    const data = await fetch(LIVE_YT + `&id=${videoId}`);
    const json = await data.json();
    // setSearchResults(json.items);
    console.log(json);
    setLiveChatId(json?.items?.[0]?.liveStreamingDetails?.activeLiveChatId);
  };

  return (
    <div className="">
      <div className="flex flex-col w-full">
        <div className="px-5 flex w-full">
          <div className="w-2/3">
            <iframe
              width="100%"
              height="600"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-1/3">
            {liveChatId && <LiveChat liveChatId={liveChatId} />}
          </div>
        </div>
        <CommentsContainer videoId={videoId} />
      </div>
    </div>
  );
};

export default WatchPage;
