import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-gray-300">
      <div className="text-center">
        <h1 className=" text-2xl lg:text-4xl xl:text-6xl font-bold text-indigo-500">404</h1>
        <p className="mt-4 text-base md:text-xl">Oops! The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 text-black bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
