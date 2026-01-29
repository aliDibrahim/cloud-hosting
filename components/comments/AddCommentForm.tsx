"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { MdSend } from "react-icons/md";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/utils/constants";

interface AddCommentFormProps {
  articleId: number;
}

const AddCommentForm = ({ articleId }: AddCommentFormProps) => {
  const router = useRouter();
  const [text, setText] = useState("");

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text === "") return toast.warning("Please write something");

    try {
      await axios.post(`${DOMAIN}/api/comments`, { text, articleId });
      router.refresh();
      setText("");
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={formSubmitHandler}
      className="flex items-center justify-between gap-2 m-auto lg:w-[80%] md:w-[90%] "
    >
      <input
        className="border border-gray-500 rounded-sm px-3 py-2 
         focus:outline-none focus:border-blue-400 duration-300 w-full"
        type="text"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-900 px-3 py-2.5 text-white  p-1 w-min text-xl rounded-sm hover:bg-blue-600 cursor-pointer duration-300"
      >
        <MdSend />
      </button>
    </form>
  );
};

export default AddCommentForm;
