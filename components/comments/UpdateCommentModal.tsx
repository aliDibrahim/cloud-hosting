"use client";
import { useState, Dispatch, SetStateAction, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { DOMAIN } from "@/utils/constants";

interface UpdateCommentModalProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
  commentId: number;
}

const UpdateCommentModal = ({
  setOpen,
  text,
  commentId,
}: UpdateCommentModalProps) => {
  const [updatedText, setUpdatedText] = useState(text);
  const router = useRouter();

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (updatedText === "") return toast.info("Please write something");
    if (updatedText === text)
      return toast.info(
        "No changes detected - your edited comment is the same as before.",
      );

    try {
      await axios.put(`${DOMAIN}/api/comments/${commentId}`, {
        text: updatedText,
      });
      router.refresh();
      setUpdatedText("");
      setOpen(false);
    } catch (error: any) {
      toast.error(error?.response?.data.message);
      console.log(error);
    }
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black/70  flex items-center justify-center">
      <div className="w-11/12 md:w-7/12 lg:w-6/12 bg-gray-900 rounded-sm p-3">
        <div className="flex justify-end items-start mb-5">
          <IoMdCloseCircleOutline
            onClick={() => setOpen(false)}
            className="text-red-700 cursor-pointer text-3xl"
          />
        </div>
        <form onSubmit={formSubmitHandler}>
          <input
            type="text"
            placeholder="Edit Comment..."
            className="text-lg rounded-sm p-2 w-full bg-transparent mb-2 text-white border border-gray-600 focus:border-blue-700 outline-none"
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
          <button
            type="submit"
            className="block mx-auto bg-blue-700 w-fit text-white mt-2 px-20 py-2 text-xl rounded-sm hover:bg-blue-900 duration-300 cursor-pointer  "
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCommentModal;
