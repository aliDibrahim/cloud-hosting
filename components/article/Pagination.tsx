import Link from "next/link";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
interface PaginationProps {
  pages: number;
  pageNumber: number;
  route: string;
}

const Pagination = ({ pageNumber, pages, route }: PaginationProps) => {

  let pagesArray: number[] = [];
  for (let i = 1; i <= pages; i++) pagesArray.push(i);

  const prev = pageNumber - 1;
  const next = pageNumber + 1;

  return (
    <div className="flex items-center justify-center mt-6 mb-4">
      {pageNumber !== 1 && (
        <Link
          href={`${route}?pageNumber=${prev}`}
          className=" text-gray-700 rounded-sm py-1 px-1 font-bold text-xl cursor-pointer hover:bg-gray-200  duration-200 "
        >
          <HiChevronLeft />
        </Link>
      )}
      {pagesArray.map((page) => (
        <Link
          href={`${route}?pageNumber=${page}`}
          className={`${
            pageNumber === page ? "bg-blue-900 text-zinc-100 hover:bg-blue-900 hover:text-zinc-100" : ""
          }  border border-gray-700 text-gray-700 me-1 rounded-sm  py-1 px-2.5 font-bold text-xl cursor-pointer hover:bg-blue-200  duration-200 `}
          key={page}
        >
          {page}
        </Link>
      ))}
      {pageNumber !== pages && (
        <Link
          href={`${route}?pageNumber=${next}`}
          className="  text-gray-700 rounded-sm py-1 px-1 font-bold text-xl cursor-pointer hover:bg-blue-300  duration-200 "
        >
          <HiChevronRight />
        </Link>
      )}
    </div>
  );
};

export default Pagination;
