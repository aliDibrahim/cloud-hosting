import { getSingleArticle } from "@/apiCalls/articleApiCall";
import EditArticleForm from "./EditArticleFrom";
import { Article } from "@/generated/prisma/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyTokenForPage } from "@/utils/verifyToken";

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

const EditArticlePage = async ({ params }: EditArticlePageProps) => {
  // -----------------------------
  // check if the logged in user is the admin
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value || "";
  if (!token) {
    redirect("/");
  }
  const payload = verifyTokenForPage(token);

  if (!payload || payload.isAdmin === false) {
    redirect("/");
  }
  // -----------------------------
  const { id } = await params;
  const article: Article = await getSingleArticle(id);
  return (
    <section className="mt-6 px-5 lg:px-20">
      <div className="w-[600px]  max-w-[90%] m-auto mt-10 mb-10">
        <h2 className="text-2xl text-blue-900 font-semibold mb-4">
          Edit Article
        </h2>
        <EditArticleForm article={article} />
      </div>
    </section>
  );
};

export default EditArticlePage;
