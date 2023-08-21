import { useEffect } from "react";
import {
  OFFICIAL_YT_LIVE_BROADCASTS,
  OFFICIAL_YT_LIVE_STREAM,
} from "../utils/contants";

const LiveStream = () => {
  useEffect(() => {
    console.log("ddd")
    // getList();
    getLiveChat();
  }, []);

  const getList = async () => {
    const data = await fetch(OFFICIAL_YT_LIVE_STREAM);
    const json = await data.json();
    console.log("json", json);
  };

  const getLiveChat = async () => {
    console.log("qqq");
    const data = await fetch(OFFICIAL_YT_LIVE_BROADCASTS);
    const json = await data.json();
    console.log("eee", json);
  };

  return <div>LiveStream</div>;
};

export default LiveStream;
