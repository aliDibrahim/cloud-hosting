import Link from "next/link";
import { Article } from "@/generated/prisma/client";

interface ArticleProps {
  article: Article;
}

const ArticleItem = ({ article }: ArticleProps) => {
  return (
    <div
      key={article.id}
      className="p-5 rounded-lg border-2 border-gray-400 my-1 hover:bg-slate-200 w-full"
    >
      <h3 className="text-xl font-bold text-gray-800 line-clamp-1 text-center">
        {article.title}
      </h3>
      <p className="my-4 text-xl text-gray-700 p-1 line-clamp-1 text-center">
        {article.description}
      </p>
      <Link
        href={`/articles/${article.id}`}
        className="text-xl mt-4 bg-blue-900 hover:bg-blue-800 w-full block text-center p-1 text-white rounded-sm"
      >
        Read More
      </Link>
    </div>
  );
};

export default ArticleItem;
