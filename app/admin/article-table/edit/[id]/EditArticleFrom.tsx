"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { Article } from "@/generated/prisma/client";

interface EditArticleFormProps {
  article: Article;
}

const EditArticleForm = ({ article }: EditArticleFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("Title is required");
    if (description === "") return toast.error("Description is required");

    try {
      await axios.put(`${DOMAIN}/api/articles/${article.id}`, {
        title,
        description,
      });
      toast.success("article updated");
      router.replace(`/articles/${article.id}`);
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className="flex flex-col">
      <input
        className="border border-gray-500 rounded mb-4 px-3 py-2 
         focus:outline-none focus:border-blue-400 duration-300"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="border border-gray-500 rounded mb-4 px-3 py-2 
         focus:outline-none focus:border-blue-400 duration-300 resize-none"
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button
        type="submit"
        className="text-xl text-white bg-black hover:bg-blue-900 py-1 px-12 cursor-pointer rounded-sm font-bold w-fit mx-auto duration-300"
      >
        Edit
      </button>
    </form>
  );
};

export default EditArticleForm;
