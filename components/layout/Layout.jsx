import React from "react";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div className=" flex flex-col h-screen">
      <header className=" bg-blue-300 flex-none p-2">
        <Link href="/">
          <a className="py-2 px-4 bg-white border border-black rounded">Home</a>
        </Link>
      </header>
      <main className=" bg-blue-400 min-h-0 flex-1">{children}</main>
    </div>
  );
};

export default Layout;
