"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import close from "@/public/svgs/close.svg";
import menu from "@/public/svgs/menu.svg";

export default function Navbar() {
  // State to manage the visibility of the mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeMenuButtonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when user clicks outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        closeMenuButtonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !closeMenuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          </ul>

          {isMenuOpen ? (
            <button
              type="button"
              className="hover:cursor-pointer xs:hidden py-2 pl-2"
              aria-label="Close menu"
              onClick={() => {
                setIsMenuOpen(false);
              }}
              ref={closeMenuButtonRef}
            >
              <Image src={close} alt="Close menu" className="size-4" />
            </button>
          ) : (
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
          )}
        </div>

        {/* Mobile navigation dropdown */}
        <div
          className={`${isMenuOpen ? "block" : "hidden"} xs:hidden absolute top-12 right-0 mr-2 z-50`}
          ref={dropdownRef}
        >
          <NavigationDropdown />
        </div>
      </nav>
    </header>
  );
}

// Navigation dropdown for mobile devices
// TODO: Update the links and routes when routes have been created
function NavigationDropdown() {
  return (
    <div className="bg-white border border-green-600 rounded-xl px-4 py-3 w-min">
      <ul className="space-y-2.5">
        <li>
          <Link href="/">
            <p className="text-sm text-nowrap">Home</p>
          </Link>
        </li>
        <li>
          <Link href="/">
            <p className="text-sm text-nowrap">About</p>
          </Link>
        </li>
        <li>
          <Link href="/">
            <p className="text-sm text-nowrap">Sponsor</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}
