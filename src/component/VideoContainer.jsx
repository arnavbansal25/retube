import React, { useEffect, useRef, useState } from "react";
import {
  OFFICIAL_YT_LIVE_BROADCASTS,
  YOUTUBE_VIDEOS_API,
} from "../utils/contants";
import VideoCard from "./VideoCard";
import { Link, useNavigate } from "react-router-dom";
import Shimmer from "./common/Shimmer";
import { useSelector } from "react-redux";

const VideoContainer = () => {
  const targetRef = useRef(null);
  const navigate = useNavigate();

  const selectedCategory = useSelector(
    (store) => store.category.selectedCategory
  );

  const [videos, setVideos] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [apiError, setApiError] = useState(null);

  const getVideos = async () => {
    let url =
      selectedCategory?.id === "-1"
        ? ""
        : `&videoCategoryId=${selectedCategory?.id}`;
    url += nextPageToken ? `&pageToken=${nextPageToken}` : "";

    let response;
    try {
      response = await fetch(YOUTUBE_VIDEOS_API + url);
    } catch (error) {
      console.log("Error:", error);
    }

    if (response?.ok) {
      const data = await response.json();
      setVideos((prevVideos) => [...prevVideos, ...data.items]);
      setNextPageToken(data.nextPageToken);

      if (!data.nextPageToken) {
        sethasMore(false);
      }
    } else {
      setApiError(
        "No result found at the moment, redirecting to Search instead..."
      );
      setTimeout(() => {
        navigate(`/results?search_query=${selectedCategory?.name}`);
      }, [1000]);
      sethasMore(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setNextPageToken(null);
    setVideos([]);
    sethasMore(true);
  }, [selectedCategory]);

  function onIntersection(entries) {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasMore) {
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

  return (
    <div className="mt-16">
      <div className="flex flex-wrap">
        {videos?.map((video, index) => (
          <Link
            key={video?.id}
            to={`/watch?v=${video?.id}`}
            className="mt-6 mr-4 w-72"
          >
            <VideoCard info={video} />
          </Link>
        ))}
      </div>
      {hasMore && (
        <div ref={targetRef}>
          <Shimmer />
        </div>
      )}
      {apiError && <div className="text-center mt-2">{apiError}</div>}
    </div>
  );
};

export default VideoContainer;
