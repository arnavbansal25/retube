import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateRandomMessage, generateRandomName } from "../utils/helper";
import { LIVE_CHAT_MSGS } from "../utils/contants";

const LiveChat = ({ liveChatId }) => {
  const [inputText, setInputText] = useState();

  const [nextPageToken, setNextPageToken] = useState(null);

  const dispatch = useDispatch();

  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      // API Polling
      getLiveChat();
      // dispatch(
      //   addMessage({
      //     name: generateRandomName(),
      //     message: generateRandomMessage() + " XD",
      //   })
      // );
    }, 500); // polling data every 0.5 seconds

    return () => clearInterval(i);
  }, []);

  const getLiveChat = async () => {
    let url = `&liveChatId=${liveChatId}`;
    url += nextPageToken ? `&pageToken=${nextPageToken}` : "";
    const data = await fetch(LIVE_CHAT_MSGS + url);
    const json = await data.json();
    // setSearchResults(json.items);
    console.log(json);
    json?.items?.map((chat, index) => {
      dispatch(
        addMessage({
          name: chat?.authorDetails?.displayName,
          profileImg: chat?.authorDetails?.profileImageUrl,
          message: chat?.snippet?.displayMessage,
        })
      );
    });
    setNextPageToken(json?.nextPageToken);
  };

  return (
    <>
      <div className="w-full h-[600px] ml-2 p-2 border border-black bg-slate-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
        {/* DON'T USE INDEXES AS KEYS */}
        {chatMessages?.map((c, i) => (
          <ChatMessage key={i} name={c?.name} profileImg={c.profileImg} message={c?.message} />
        ))}
      </div>
      <form
        className="w-full p-2 ml-2 border border-black"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            addMessage({
              name: "Arnav Bansal",
              message: inputText,
            })
          );
          setInputText("");
        }}
      >
        <input
          className="px-2 w-96"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button className="px-2 mx-2 bg-green-200">Send</button>
      </form>
    </>
  );
};

export default LiveChat;
