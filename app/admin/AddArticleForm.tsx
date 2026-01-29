"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";

const AddArticleForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("Title is required");
    if (description === "") return toast.error("Description is required");

    try {
      // remember that the client send the cookie with this request automatically
      await axios.post(`${DOMAIN}/api/articles`, { title, description });
      setTitle("");
      setDescription("");
      toast.success("New article added");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col ">
      <input
        className="border border-gray-500 rounded mb-4 px-3 py-2 
         focus:outline-none focus:border-blue-400 duration-300"
        type="text"
        placeholder="Enter Article Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border border-gray-500 rounded mb-4 px-3 py-2 
         focus:outline-none focus:border-blue-400 duration-300 resize-none"
        rows={5}
        placeholder="Enter Artilce Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="text-xl text-white bg-black hover:bg-blue-900 py-1 px-12 cursor-pointer rounded-sm font-bold w-fit mx-auto duration-300"
      >
        Add
      </button>
    </form>
  );
};

export default AddArticleForm;
