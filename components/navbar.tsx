"use client";

import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <header className="bg-white shadow border-b">
      <nav className="container mx-auto px-12 py-2">
        <div className="flex justify-between items-center">
          <a href="/">
            <Image
              src="/hbl_logo.png"
              alt="HBL Logo"
              width={100}
              height={100}
            />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
