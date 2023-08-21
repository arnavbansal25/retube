import React from "react";
import { formatNumber } from "../utils/helper";

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  // const { channelTitle, title, thumbnails } = snippet;
  // const { viewCount } = statistics;

  return (
    <div>
      <img
        className="rounded-lg"
        alt="thumbnail"
        src={snippet?.thumbnails.medium.url}
      />
      <ul>
        <li
          className="font-bold py-2 line-clamp-2 h-[60px] group"
          title={snippet?.title}
        >
          {snippet?.title}
        </li>
        <li>{snippet?.channelTitle}</li>
        <li>{formatNumber(statistics?.viewCount)} views</li>
      </ul>
    </div>
  );
};

export default VideoCard;
