import React, { useState, useEffect } from "react";
import {
  BASE_URL,
  OFFICIAL_YT_COMMENTS_API,
  VIDEO_COMMENTS,
  fetchFromAPI,
  options,
} from "../utils/contants";

const commentsData = [
  {
    name: "Akshay Saini",
    text: "Lorem ipsum dolor",
    replies: [
      {
        name: "Akshay Saini",
        text: "Lorem ipsum dolor",
        replies: [
          {
            name: "Akshay Saini",
            text: "Lorem ipsum dolor",
            replies: [],
          },
          {
            name: "Akshay Saini",
            text: "Lorem ipsum dolor",
            replies: [
              {
                name: "Akshay Saini",
                text: "Lorem ipsum dolor",
                replies: [],
              },
            ],
          },
          {
            name: "Akshay Saini",
            text: "Lorem ipsum dolor",
            replies: [],
          },
        ],
      },
    ],
  },
  {
    name: "Akshay Saini",
    text: "Lorem ipsum dolor",
    replies: [],
  },
  {
    name: "Akshay Saini",
    text: "Lorem ipsum dolor",
    replies: [],
  },
  {
    name: "Akshay Saini",
    text: "Lorem ipsum dolor",
    replies: [],
  },
];

const Comment = ({ data }) => {
  return (
    <div className="flex shadow-sm bg-gray-100 p-2 rounded-lg my-2">
      <img
        className="h-12"
        alt="user-icon"
        src={
          data?.authorProfileImageUrl ||
          "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
        }
      />
      <div className="px-3">
        <p className="font-bold">{data?.authorDisplayName}</p>
        <p>{data?.textOriginal}</p>
      </div>
    </div>
  );
};

const CommentsList = ({ videoComments }) => {
  // Discaimer: don't use indexes as keys
  return videoComments?.map((comment, index) => (
    <div key={index}>
      <Comment
        data={comment?.snippet?.topLevelComment?.snippet || comment?.snippet}
      />
      {comment?.totalReplyCount}
      <div className="ml-5 pl-5 border border-l-black">
        <CommentsList videoComments={comment?.replies?.comments} />
      </div>
    </div>
  ));
};

const CommentsContainer = ({ videoId }) => {
  const [videoComments, setVideoComments] = useState([]);

  useEffect(() => {
    getVideoComments();
  }, []);

  const getVideoComments = async () => {
    const data = await fetch(`${OFFICIAL_YT_COMMENTS_API}&videoId=${videoId}`);
    const json = await data.json();
    console.log("json", json);
    setVideoComments(json.items);
  };

  return (
    <div className="m-5 p-2">
      <h1 className="text-2xl font-bold">Comments: </h1>
      <CommentsList videoComments={videoComments} />
    </div>
  );
};

export default CommentsContainer;
