"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const SearchArticleInput = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const formSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/articles/search?searchText=${searchText}`);
  };

  return (
    <form onSubmit={formSubmitHandler} className="my-5 w-full md:w-2/3 m-auto">
      <input
        className="border border-gray-500 rounded px-3 py-2 w-full
         focus:outline-none focus:border-blue-400 duration-300"
        type="search"
        placeholder="Search for article"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
};

export default SearchArticleInput;
