import Link from "next/link";
import { CgMenuGridR } from "react-icons/cg";
import { MdOutlineArticle } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";

const AdminSidebar = () => {
  return (
    <>
      <Link
        href="/admin"
        className="flex items-center justify-center mt-2 text-lg lg:text-2xl font-semibold"
      >
        <CgMenuGridR className="text-3xl" />
        <span>Dashboard</span>
      </Link>
      <ul className="mt-6 flex items-center justify-center gap-4 ">
        <Link
          className="flex items-center text-xl mb-5  hover:text-blue-500 duration-300"
          href="/admin/article-table?pageNumber=1"
        >
          <MdOutlineArticle className="me-1" />
          <span className="hidden md:block">Articles</span>
        </Link>
        <Link
          className="flex items-center text-xl mb-5  hover:text-blue-500 duration-300"
          href="/admin/comments-table"
        >
          <FaRegComments className="me-1" />
          <span className="hidden md:block">Comments</span>
        </Link>
      </ul>
    </>
  );
};

export default AdminSidebar;
