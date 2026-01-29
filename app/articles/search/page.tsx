import { getArticlesBasedOnSearch } from "@/apiCalls/articleApiCall";
import ArticleItem from "@/components/article/Article";
import { Article } from "@/generated/prisma/client";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;

  // Now you can access specific parameters
  const searchText = resolvedSearchParams.searchText || "";
  console.log("the search parameters is ", searchText);

  const articles: Article[] = await getArticlesBasedOnSearch(searchText);

  return (
    <div className="fix-height container m-auto px-5">
      {articles.length === 0 ? (
        <h2 className="text-center text-gray-600 text-bold p-5 md:text-2xl lg:text-2xl">
          Articles based on <span className="text-red-700">{searchText}</span>{" "}
          not found.
        </h2>
      ) : (
        <>
          <h1 className="text-2xl font-bold mt-6 mb-2 text-center">
            Article based on
            <span className="ms-1 text-blue-800 text-3xl font-bold">
              {searchText}
            </span>
          </h1>

          <div
            className={`grid gap-6 ${
              articles.length === 1
                ? "w-[500px] max-w-full mx-auto"
                : "grid-cols-[repeat(auto-fit,minmax(350px,1fr))]"
            }`}
          >
            {articles.map((item) => (
              <ArticleItem key={item.id} article={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
