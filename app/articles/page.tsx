import ArticleItem from "@/components/article/Article";
import SearchArticleInput from "@/components/article/SearchArticleInput";
import Pagination from "@/components/article/Pagination";
// import the type of the article that generated in prisma
import { Article } from "../generated/prisma/client";
import { getArticles } from "@/apiCalls/articleApiCall";
import { getArticlesCount } from "@/apiCalls/articleApiCall";
import { pageSize } from "@/utils/constants";
// --------------------------------------------------------
interface ArticlePageProps {
  searchParams: Promise<{ pageNumber: string }>;
}
// --------------------------------------------------------
const Articles = async ({ searchParams }: ArticlePageProps) => {
  const { pageNumber = "1" } = await searchParams;

  // convert json to java script object
  const articles: Article[] = await getArticles(pageNumber);
  // get the articles count
  const count = await getArticlesCount();
  const pages = Math.ceil(count / pageSize);
  // --------------------------------------------------------
  return (
    <section className="container m-auto p-5 ">
      <SearchArticleInput />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleItem article={article} key={article.id} />
        ))}
      </div>
      <Pagination
        pageNumber={Number(pageNumber)}
        route="http://localhost:3000/articles"
        pages={pages}
      />
    </section>
  );
};

export default Articles;
