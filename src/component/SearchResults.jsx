import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { YOUTUBE_SEARCH_CONTENT } from "../utils/contants";
import SearchResultCard from "./SearchResultCard";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const search_query = searchParams?.get("search_query");

  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getSearchResults();
  }, [search_query]);

  const getSearchResults = async () => {
    let url =
      search_query === "live" ? "&type=video&eventType=live" : search_query;
    const data = await fetch(YOUTUBE_SEARCH_CONTENT + url);
    const json = await data.json();
    setSearchResults(json.items);
    console.log(json);
  };

  return (
    <div className="bg-orange-200">
      {searchResults?.map((content) => (
        <Link
          key={content?.id?.videoId}
          to={`/watch?v=${content?.id?.videoId}`}
        >
          <SearchResultCard info={content} />
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
