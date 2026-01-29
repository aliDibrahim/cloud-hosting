const ArticlesLoading = () => {
  return (
    <section className="container m-auto p-5 animate-pulse">
      <div className="my-5 w-full md:w-2/3 m-auto bg-gray-200 h-12 rounded-lg"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => {
          return (
            <div className="p-5 rounded-lg  bg-gray-200 my-1 w-full" key={item}>
              <h3 className="h-6 rounded-lg bg-gray-300 mb-4"></h3>
              <p className="h-12 rounded-lg bg-gray-300 "></p>
              <div className=" mt-4 mx-auto w-[80%] block  p-1 rounded-lg bg-gray-400 h-8"></div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ArticlesLoading;
