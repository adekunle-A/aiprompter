"use client";
import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

useState;
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    //fetchPrompts
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setAllPosts(data);
    };
    fetchPrompts();
  }, []);

  const handleSearchChange = (e) => {};
  const handleTagClick = (tagName) => {};

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
