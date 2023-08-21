import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API, YT_SUBS } from "../utils/contants";
import { cacheResults } from "../utils/searchSlice";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  auth,
  logOut,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../Firebase";
import { menu_icon, yt_logo } from "../assets";
import { useComponentVisible } from "../utils/helper";
import ButtonList from "./ButtonList";

const Head = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store) => store.search);

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(true);

  useEffect(() => {
    // make an api call after every key press
    // but if the difference between 2 api calls  < 200 ms....decline the api call
    // const timer = setTimeout(() => getSearchSuggestions(), 200); // make api call after 200 ms

    // return () => {
    //   clearTimeout(timer);
    // };

    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200); // make api call after 200 ms

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  /*
    query = i
      -> update state "serchQuery"
      -> render the component
      -> useEffect() since "searchQuery" is in the dependency array
      -> start a timer 200ms and make an api call after it ends

  Case 1: Before 200ms are over
    append "p", so query = ip
      -> destroy the current component in DOM
      -> call the return fn of useEffect
      -> clear the timer "timer" so there won't be any api call for query="i"
      -> update state "searchQuery"
      -> render the component
      -> useEffect() since "searchQuery" is in the dependency array
      -> start a NEW timer of 200ms and make an api call after it ends

  Case 2: After 200ms are over
      -> api call made with query="i"
    append "p", so query = ip
      -> destroy the current component in DOM
      -> call the return fn of useEffect (nothing to clear since the timer "timer" has already completed execution)
      -> update state "searchQuery"
      -> render the component
      -> useEffect() since "searchQuery" is in the dependency array
      -> start a NEW timer of 200ms and make an api call after it ends
  */

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery, {
      method: "GET",
      mode: "cors",
      redirect: "follow",
    });
    const json = await data.json();
    setSuggestions(json[1]);

    // updating the cache
    // dispatch(cacheResults({ a: [1, 2, 3] }));
    dispatch(cacheResults({ [searchQuery]: json[1] }));
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const register = () => {};

  // const getSubs = async () => {
  //   const data = await fetch(YT_SUBS, {
  //     method: "GET",
  //     mode: "cors",
  //     redirect: "follow",
  //   });
  //   const json = await data.json();
  //   console.log("hhh", json)
  // };
  // useEffect(() => {
  //   getSubs()
  // }, [])

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleNavigateToSearchResults(searchQuery);
    }
  };

  const handleNavigateToSearchResults = (query) => {
    console.log("clicked");
    setIsComponentVisible(false);
    navigate(`/results?search_query=${query}`);
  };

  return (
    <div className="w-full fixed left-0 top-0 px-4 py-2 bg-white flex justify-between">
      <div className="flex justify-between items-center gap-2">
        <div className="hover:bg-hoverGrayBG hover:rounded-full p-1">
          <img
            src={menu_icon}
            className="cursor-pointer w-8 "
            onClick={toggleMenuHandler}
            alt="toggle-menu"
          />
        </div>
        <a href="/">
          <img className="h-5 mx-2" alt="youtube-logo" src={yt_logo} />
        </a>
      </div>
      <div ref={ref} className="w-[40%] flex justify-center items-center">
        <div className="flex w-full">
          <div className="flex w-full border border-gray-400 pl-4 rounded-l-full">
            <input
              className="w-full focus:outline-none"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {/* {searchQuery !== "" && (
              <CloseIcon
                className="self-center cursor-pointer"
                onClick={() => setSearchQuery("")}
              />
            )} */}
          </div>
          <button
            onClick={() => handleNavigateToSearchResults(searchQuery)}
            className="px-6 py-2 rounded-r-full bg-gray-100"
          >
            {/* <SearchIcon /> */}
          </button>
        </div>

        {isComponentVisible && suggestions?.length !== 0 && (
          <ul className="fixed top-14 bg-white py-2 w-[40%] rounded-lg shadow-lg border border-gray-100">
            {suggestions?.map((s) => (
              <li
                key={s}
                onClick={() => {
                  setSearchQuery(s);
                  handleNavigateToSearchResults(s);
                  document.activeElement.blur();
                }}
                className="z-10 px-3 py-2 hover:bg-gray-100 cursor-default"
              >
                {/* <SearchIcon />  */}
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* <button onClick={signInWithGoogle}>Login</button>
      <button onClick={logOut}>Logout</button> */}
      <div className="col-span-1">
        <img
          className="h-8"
          alt="user-icon"
          src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
        />
      </div>
    </div>
  );
};

export default Head;
