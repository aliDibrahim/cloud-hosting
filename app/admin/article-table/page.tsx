import { pageSize } from "@/utils/constants";
import Link from "next/link";
import { getArticles, getArticlesCount } from "@/apiCalls/articleApiCall";
import Pagination from "@/components/article/Pagination";
import DeleteArticleButton from "./DeleteArticleButton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { Article } from "../../generated/prisma/client";

// interface AdminArticlesTableProps {
//   searchParams: { pageNumber: string };
// }

interface AdminArticlesTableProps {
  searchParams: Promise<{ pageNumber: string }>;
}

const AdminArticlesTable = async ({
  searchParams,
}: AdminArticlesTableProps) => {
  // -------------------------------------
  // check if the user is logged in and he is an admin
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  if (!token) {
    redirect("/");
  }
  const payload = verifyTokenForPage(token);

  if (!payload || payload.isAdmin === false) {
    redirect("/");
  }
  // -------------------------------------
  // get the search params to get the articles
  const { pageNumber = "1" } = await searchParams;
  const articles: Article[] = await getArticles(pageNumber);
  // -------------------------------------
  // const count: number = await prisma.article.count();
  // const pages = Math.ceil(count / ARTICLE_PER_PAGE);
  const count = await getArticlesCount();
  const pages = Math.ceil(count / pageSize);
  // -------------------------------------
  return (
    <section className="w-[90%] mb-4 m-auto">
      <h1 className="mb-7 text-2xl font-semibold text-gray-700">Articles</h1>
      <table className="table w-full text-left">
        <thead className="text-center border-t-2 border-b-2 border-gray-500 lg:text-xl">
          <tr>
            <th className="p-1 lg:p-2">Title</th>
            <th className="hidden lg:inline-block lg:p-2">Created At</th>
            <th>Actions</th>
            <th className="hidden lg:inline-block"></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {articles.map((article) => (
            <tr key={article.id} className="border-b border-t border-gray-300">
              <td className="p-3 text-gray-700">{article.title}</td>
              <td className="hidden lg:inline-block text-gray-700 font-normal p-3">
                {new Date(article.createdAt).toDateString()}
              </td>
              <td className="p-3">
                <Link
                  href={`/admin/article-table/edit/${article.id}`}
                  className="bg-blue-700 text-white rounded-sm py-0.5 px-1.5 inline-block text-center mb-2 me-2 lg:me-3 hover:bg-blue-800 duration-200"
                >
                  Edit
                </Link>
                <DeleteArticleButton articleId={article.id} />
              </td>
              <td className="hidden lg:inline-block p-3">
                <Link
                  href={`/articles/${article.id}`}
                  className="text-white bg-blue-900 rounded-sm py-1 px-2  hover:bg-blue-600 duration-200"
                >
                  Read More
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageNumber={parseInt(pageNumber)}
        pages={pages}
        route="/admin/article-table"
      />
    </section>
  );
};

export default AdminArticlesTable;
