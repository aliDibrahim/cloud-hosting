"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface DeleteArticleButtonProps {
    articleId: number;
}

const DeleteArticleButton = ({ articleId }: DeleteArticleButtonProps) => {
    const router = useRouter();

  const deleteArticleHandler = async () => {
  toast.info(
    ({ closeToast }) => (
      <div>
        <p>you want to delete this article?</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={async () => {
              try {
                await axios.delete(`${DOMAIN}/api/articles/${articleId}`);
                router.refresh();
                toast.success("Article deleted");
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
    { autoClose: false }
  );
};


    return (
        <div onClick={deleteArticleHandler} className="bg-red-800 text-white rounded-sm cursor-pointer inline-block text-center py-0.5 px-1.5 hover:bg-red-600 duration-200">
            Delete
        </div>
    )
}

export default DeleteArticleButton