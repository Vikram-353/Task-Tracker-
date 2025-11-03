import { Heart } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <footer className="w-full  py-6 bg-conic-700 from-gray-50 to-orange-100 text-center ">
      <p className="text-gray-700 text-sm flex items-center justify-center gap-1">
        Created with
        <Heart className="text-red-500 fill-red-500 w-4 h-4 " />
        by{" "}
        <span className="font-semibold text-orange-900 cursor-pointer">
          <a href="https://vikramranjan.netlify.app/">Vikram Ranjan</a>
        </span>
      </p>
      <p className="text-gray-700 text-sm flex items-center justify-center gap-1">
        Powered by{" "}
        <span className="text-red-900 font-serif">Penthara Technologies</span>
      </p>
    </footer>
  );
}

export default Footer;
