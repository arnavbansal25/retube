import React from "react";

const SearchResultCard = ({ info }) => {
  return (
    <div className="flex mb-3 bg-red-500 p-2">
      <img
        src={info?.snippet?.thumbnails?.high?.url}
        alt={info?.snippet?.title}
        className="w-[360px] h-[200px] object-cover rounded-2xl"
      />
      <div className="bg-green-500 flex flex-col">
        <h2>{info?.snippet?.title}</h2>
        <span>{info?.snippet?.publishTime}</span>
        <div>{info?.snippet?.channelTitle}</div>
      </div>
    </div>
  );
};

export default SearchResultCard;
