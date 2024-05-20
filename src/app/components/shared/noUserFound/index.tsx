import Link from "next/link";
import React from "react";

const NoUserFound = () => {
  return (
    <div className="flex justify-center  text-center items-center w-[100%] h-[100vh]">
      {" "}
      <div>
        <div className="text-5xl mb-3">Oops! No User Found</div>
        <Link href="/" className="text-blue-600 font-bold text-xl">
          Go to Login page{" "}
        </Link>
      </div>
    </div>
  );
};

export default NoUserFound;
