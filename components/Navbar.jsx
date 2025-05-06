import React from "react";
import logo from "@/assets/compressor.png";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div
      className="w-full flex justify-between items-center bg-white dark:bg-gray-900 sm:px-8 
    px-4 py-4 border-b border-b-[#e6ebf4]"
    >
      <Link href="/" className="flex items-center gap-1">
        <Image className=" w-[32px] h-[32px]" src={logo} alt="comp logo" />
        Compressor Record
      </Link>
      <div className="gap-1 flex">
        <Link
          href="/add"
          className="
          font-inter font-medium bg-[#6469ff] 
          text-white px-4 py-2 rounded-md
          "
        >
          Add
        </Link>
        <Link
          href="/find"
          className="
          font-inter font-medium bg-[#6469ff] 
          text-white px-4 py-2 rounded-md
          "
        >
          Find
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
