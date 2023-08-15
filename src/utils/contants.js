const GOOGLE_API_KEY = "AIzaSyCb7J77eG03rKgSn5R83k8DKr7KjCR79CI";

export const YOUTUBE_VIDEOS_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${GOOGLE_API_KEY}`;

export const YOUTUBE_SEARCH_API = `https://corsproxy.io/?http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=`;

export const YOUTUBE_SEARCH_CONTENT = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&maxResults=25&key=${GOOGLE_API_KEY}&q=`;

export const YT_VIDEO_CATEGORIES = `https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=${GOOGLE_API_KEY}`;

export const YT_SUBS = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&mine=true&key=${GOOGLE_API_KEY}`;

// GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=[YOUR_API_KEY] HTTP/1.1

// Authorization: Bearer [YOUR_ACCESS_TOKEN]
// Accept: application/json

export const BASE_URL = "https://youtube-v31.p.rapidapi.com";

export const VIDEO_COMMENTS = `commentThreads?part=snippet,replies&maxResults=100&videoId=FUdATDTAWfk`;

export const OFFICIAL_YT_COMMENTS_API = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&order=relevance&key=${GOOGLE_API_KEY}&videoId=`;

export const OFFICIAL_YT_LIVE_STREAM = `https://youtube.googleapis.com/youtube/v3/liveStreams?part=snippet%2Ccdn%2CcontentDetails%2Cstatus&id=YOUR_STREAM_ID&key=${GOOGLE_API_KEY}`;

export const OFFICIAL_YT_LIVE_BROADCASTS = `https://youtube.googleapis.com/youtube/v3/liveBroadcasts?part=snippet%2CcontentDetails%2Cstatus&broadcastStatus=active&broadcastType=all&key=${GOOGLE_API_KEY}`;

export const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "ffdb09b357msh282510067bc8ffdp129959jsn7551015ac368",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

export const fetchFromAPI = async (url) => {
  try {
    const response = await fetch(`${BASE_URL}/${VIDEO_COMMENTS}`, options);
    const result = await response.json();
    console.log("yyy", result);
    return result;
  } catch (error) {
    return error;
  }
};
