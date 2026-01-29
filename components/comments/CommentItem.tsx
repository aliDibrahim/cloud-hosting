"use client";
import { CommentWithUser } from "@/utils/types";
import { FaEdit, FaTrash } from "react-icons/fa";
import UpdateCommentModal from "./UpdateCommentModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { toast } from "react-toastify";

interface CommentItemProps {
  comment: CommentWithUser;
  userId: number | undefined;
}

const CommentItem = ({ comment, userId }: CommentItemProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const commentDeleteHandler = async () => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p>you want to delete this comment?</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={async () => {
                try {
                  await axios.delete(`${DOMAIN}/api/comments/${comment.id}`);
                  router.refresh();
                  toast.success("comment deleted");
                } catch (error: any) {
                  toast.error(error?.response?.data?.message);
                }
                closeToast();
              }}
              className="cursor-pointer bg-red-700 text-white px-2 py-1 rounded hover:bg-red-500 duration-300"
            >
              Delete
            </button>

            <button
              onClick={closeToast}
              className="cursor-pointer bg-gray-700 px-2 py-1 rounded hover:bg-gray-500 duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false },
    );
  };

  return (
    <div className="mb-5 rounded-md p-3 bg-gray-100  ">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-800 uppercase">
          {comment.user.username}
        </strong>
        <span className=" text-blue-900 text-sm">
          {new Date(comment.createdAt).toDateString()}
        </span>
      </div>
      <p className="text-gray-800 mb-2">{comment.text}</p>
      {userId && userId === comment.userId && (
        <div className="flex justify-end items-center">
          <FaEdit
            onClick={() => setOpen(true)}
            className="text-green-900 text-lg cursor-pointer me-3 hover:text-green-600 duration-300"
          />
          <FaTrash
            onClick={commentDeleteHandler}
            className="text-red-900  text-lg cursor-pointer hover:text-red-600  duration-300"
          />
        </div>
      )}
      {open && (
        <UpdateCommentModal
          setOpen={setOpen}
          text={comment.text}
          commentId={comment.id}
        />
      )}
    </div>
  );
};

export default CommentItem;
