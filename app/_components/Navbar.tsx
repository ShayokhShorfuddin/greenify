"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import menu from "@/public/svgs/menu.svg";
import { HomeSidebar } from "./HomeSidebar";

export default function Navbar() {
  // State to manage the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLElement>(null);

  return (
    <header>
      <nav className="relative flex justify-between items-center font-sans px-5 pt-2">
        <p className="text-lg text-green-500 font-medium">Greenify</p>

        {/* TODO: Update the links and routes when routes have been created*/}
        <div className="flex gap-x-4 items-center">
          <ul className="hidden xs:flex gap-x-5">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/sponsor">Sponsor</Link>
            </li>
            <li>
              <Link href="/calculations">Calculations</Link>
            </li>
          </ul>

          <button
            type="button"
            className="hover:cursor-pointer xs:hidden py-2 pl-2"
            aria-label="Open menu"
            onClick={() => {
              setIsMenuOpen(true);
            }}
          >
            <Image src={menu} alt="Open menu" className="size-4" />
          </button>
        </div>

        {/* Sidebar navigation for mobile */}
        <HomeSidebar
          isMenuOpen={isMenuOpen}
          sidebarRef={dropdownRef}
          setIsMenuOpen={setIsMenuOpen}
        />
      </nav>
    </header>
  );
}
