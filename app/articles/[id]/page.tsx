import { SingleArticleType } from "@/utils/types";
import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import { getSingleArticle } from "@/apiCalls/articleApiCall";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
// -------------------------------------
interface SingleArticleProps {
  params: Promise<{ id: string }>;
}
// -------------------------------------
const SingleArticle = async ({ params }: SingleArticleProps) => {
  // -------------------------------------
  // simulate delay
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // -------------------------------------
  // Await the params first
  const { id } = await params;
  const article: SingleArticleType = await getSingleArticle(id);
  // -------------------------------------
  // check user is logged in or not
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  // -------------------------------------
  return (
    <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4">
      <div className="bg-white px-7 py-3 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-600 mb-2">
          {article.title}
        </h1>

        <div className="text-gray-400">
          {new Date(article.createdAt).toDateString()}
        </div>
        <p className="text-gray-800 text-xl mt-5">{article.description}</p>
      </div>
      {payload ? (
        <AddCommentForm articleId={article.id} />
      ) : (
        <p className="text-blue-800 px-7">
          To write a commnet you should login first.
        </p>
      )}
      <h4 className="text-xl text-gray-800 mb-2 mt-4">Comments</h4>

      {article?.comments?.length === 0 ? (
        <p className="text-gray-600">No comments yet.</p>
      ) : (
        article?.comments?.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            userId={payload?.id}
          />
        ))
      )}
    </section>
  );
};

export default SingleArticle;
