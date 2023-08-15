//   const [apiError, setApiError] = useState(null);

//   const navigate = useNavigate();

//   const getVideos = async () => {
//     setIsLoading(true);
//     console.log("videos fetched", nextPageToken);

//     let url = "";
//     url +=
//       selectedCategory?.id === "-1"
//         ? ""
//         : `&videoCategoryId=${selectedCategory?.id}`;
//     url += nextPageToken ? `&pageToken=${nextPageToken}` : "";

//     let response;
//     try {
//       response = await fetch(YOUTUBE_VIDEOS_API + url);
//     } catch (error) {
//       console.log(error);
//     }

//     if (response?.ok) {
//       const json = await response.json();
//       setVideos([...videos, ...json.items]);
//       console.log("ttt", json?.nextPageToken);
//       setNextPageToken(json?.nextPageToken);
//       setIsLoading(false);
//     } else {
//       setApiError(
//         "No result found at the moment, redirecting to Search instead..."
//       );
//       setTimeout(() => {
//         navigate(`/results?search_query=${selectedCategory?.name}`);
//       }, [2000]);
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getVideos();
//   }, [selectedCategory]);

//   // if (isLoading) return <div>Loading...</div>;

//   // if (apiError) return <div>{apiError}</div>;

import React, { useEffect, useRef, useState } from "react";
import {
  OFFICIAL_YT_LIVE_BROADCASTS,
  YOUTUBE_VIDEOS_API,
} from "../utils/contants";
import VideoCard from "./VideoCard";
import { Link, useNavigate } from "react-router-dom";
import Shimmer from "./common/Shimmer";

const VideoContainer = ({ selectedCategory }) => {
  const targetRef = useRef(null);

  const [videos, setVideos] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);

  const getVideos = async () => {
    let url =
      selectedCategory?.id === "-1"
        ? ""
        : `&videoCategoryId=${selectedCategory?.id}`;
    url += nextPageToken ? `&pageToken=${nextPageToken}` : "";
    const response = await fetch(YOUTUBE_VIDEOS_API + url);
    const data = await response.json();
    setVideos((prevVideos) => [...prevVideos, ...data.items]);
    setNextPageToken(data.nextPageToken);

    if (!data.nextPageToken) {
      sethasMore(false);
    }
  };

  useEffect(() => {
    setNextPageToken(null);
    setVideos([]);
    sethasMore(true);
  }, [selectedCategory]);

  function onIntersection(entries) {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
      // console.log("eee");
      getVideos();
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);

    if (observer && targetRef.current) observer.observe(targetRef.current);

    return () => {
      if (observer && targetRef.current) observer.unobserve(targetRef.current);
    };
  }, [videos]);

  console.log(videos.length);

  return (
    <>
      <div className="flex flex-wrap">
        {videos?.map((video, index) => (
          <Link key={video?.id} to={`/watch?v=VDmZXoeDfNs`}>
            <VideoCard info={video} />
          </Link>
        ))}
      </div>
      {hasMore && (
        <div ref={targetRef}>
          <Shimmer />
        </div>
      )}
    </>
  );
};

export default VideoContainer;
