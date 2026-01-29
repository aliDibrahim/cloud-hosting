"use client";
import Link from "next/link";
interface ErrorPageProps {
  error: Error;
  reset: () => void;
}
const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="pt-7 text-center">
      <div className="text-3xl text-red-700 font-semibold">
        Something went wrong
      </div>
      <h2 className="text-gray-700 mt-2 text-xl">{error.message}</h2>
      <button
        onClick={() => reset()}
        className="bg-blue-900 hover:bg-blue-400 cursor-pointer text-white font-bold py-2 px-4 my-3 rounded-sm duration-150"
      >
        Try again
      </button>
      <Link
        href={"/"}
        className="text-xl text-black underline block mt-2 hover:text-blue-700 duration-150"
      >
        Go to home page
      </Link>
    </div>
  );
};

export default ErrorPage;
