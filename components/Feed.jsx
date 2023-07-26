"use client";
import PromptCard from "./PromptCard";
import { debounce } from "@utils/debounce";
import { useEffect, useState } from "react";
import { searchPrompts } from "../utils/searchUtils";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  //fetchPrompts
  const fetchPrompts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setAllPosts(data);
    setOriginalData(data);
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  useEffect(() => {
    if (searchText !== "") {
      const filteredPrompts = searchPrompts(allPosts, searchText);
      setAllPosts(filteredPrompts);
    } else {
      setAllPosts(originalData);
    }
  }, [searchText]);

  // Debounce the search input to avoid frequent API calls
  const debouncedSearch = debounce((value) => {
    setSearchText(value);
  }, 100);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    debouncedSearch(value);
  };
  const handleTagClick = (tagName) => {
    setSearchText(tagName);
  };

  const PromptCardList = ({ data, handleTagClick }) => {
    return (
      <div className=" mt-16 prompt_layout">
        {data.map((post) => {
          return (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
            />
          );
        })}
      </div>
    );
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
