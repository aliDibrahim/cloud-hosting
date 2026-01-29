import React from "react";
import Link from "next/link";
const NotFound = () => {
  return (
    // fix-height is not a tailwind css class, it is a custom class that i make it in global.css file
    <section className="fix-height flex justify-center items-center flex-col mt-6">
      <h1 className="text-6xl text-gray-800">404</h1>
      <p className="text-gray-500 text-3xl mt-2 mb-5">Sorry, This page is not found</p>
      <Link href={"/"} className="text-xl underline text-blue-500 ">Home page</Link>
    </section>
  );
};

export default NotFound;
